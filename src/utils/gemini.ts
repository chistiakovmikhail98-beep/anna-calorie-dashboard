import { MealEntry, FoodItem } from '../types';
import { FOODS } from '../data/foods';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface GeminiParsedItem {
  name: string;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const SYSTEM_PROMPT = `Ты — нутрициолог-ассистент. Пользователь описывает что он съел текстом.
Твоя задача — разобрать текст на отдельные продукты.

Для каждого продукта укажи:
- name: название продукта по-русски (простое, как в базе данных: "Куриная грудка", "Рис отварной", "Борщ")
- grams: примерный вес порции в граммах
- calories: калории для этой порции (на случай если продукта нет в нашей базе)
- protein: белки в граммах
- fat: жиры в граммах
- carbs: углеводы в граммах

Если пользователь не указал размер порции, используй стандартную:
- тарелка супа = 300г
- кусок хлеба = 30г
- чашка чая/кофе = 200мл
- стакан = 250мл
- порция каши = 200г
- порция салата = 150г
- котлета = 80г
- яйцо = 60г
- порция мяса/рыбы = 150г

ВАЖНО: используй максимально простые и общепринятые названия продуктов.
Ответь ТОЛЬКО валидным JSON массивом, без markdown, без комментариев:
[{"name":"...","grams":...,"calories":...,"protein":...,"fat":...,"carbs":...}]`;

// Нормализация строки для сравнения
function normalize(str: string): string {
  return str.toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^а-яa-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Поиск совпадения в локальной базе продуктов
function findInLocalDB(name: string): FoodItem | null {
  const norm = normalize(name);
  const words = norm.split(' ');

  // 1. Точное совпадение
  for (const food of FOODS) {
    if (normalize(food.name) === norm) return food;
  }

  // 2. Одно название содержит другое
  for (const food of FOODS) {
    const foodNorm = normalize(food.name);
    if (foodNorm.includes(norm) || norm.includes(foodNorm)) return food;
  }

  // 3. Все слова запроса есть в названии продукта
  for (const food of FOODS) {
    const foodNorm = normalize(food.name);
    if (words.length >= 2 && words.every(w => foodNorm.includes(w))) return food;
  }

  // 4. Поиск по ключевым словам (хотя бы главное слово совпадает)
  const mainWords = words.filter(w => w.length > 3);
  let bestMatch: FoodItem | null = null;
  let bestScore = 0;

  for (const food of FOODS) {
    const foodNorm = normalize(food.name);
    const foodWords = foodNorm.split(' ');

    let score = 0;
    for (const word of mainWords) {
      for (const fw of foodWords) {
        if (fw.includes(word) || word.includes(fw)) {
          score += Math.min(word.length, fw.length);
        }
      }
    }

    if (score > bestScore && score >= 4) {
      bestScore = score;
      bestMatch = food;
    }
  }

  return bestMatch;
}

const IMAGE_PROMPT = `Посмотри на фото еды. Определи все продукты и блюда на фотографии.

Для каждого продукта укажи:
- name: название по-русски (простое: "Куриная грудка", "Рис отварной", "Борщ")
- grams: примерный вес порции в граммах (оцени визуально)
- calories: калории для этой порции
- protein: белки в граммах
- fat: жиры в граммах
- carbs: углеводы в граммах

ВАЖНО: используй максимально простые и общепринятые названия продуктов.
Ответь ТОЛЬКО валидным JSON массивом, без markdown, без комментариев:
[{"name":"...","grams":...,"calories":...,"protein":...,"fat":...,"carbs":...}]`;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function mapToEntries(items: GeminiParsedItem[]): MealEntry[] {
  return items.map((item, i) => {
    const localFood = findInLocalDB(item.name);
    const grams = Math.round(item.grams);

    if (localFood) {
      return {
        id: `ai-${Date.now()}-${i}`,
        foodId: localFood.id,
        foodName: `${localFood.name} ✓`,
        grams,
        calories: Math.round((localFood.calories * grams) / 100),
        protein: Math.round((localFood.protein * grams) / 100 * 10) / 10,
        fat: Math.round((localFood.fat * grams) / 100 * 10) / 10,
        carbs: Math.round((localFood.carbs * grams) / 100 * 10) / 10,
      };
    }

    return {
      id: `ai-${Date.now()}-${i}`,
      foodId: `ai-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      foodName: `${item.name} ~`,
      grams,
      calories: Math.round(item.calories),
      protein: Math.round(item.protein * 10) / 10,
      fat: Math.round(item.fat * 10) / 10,
      carbs: Math.round(item.carbs * 10) / 10,
    };
  });
}

export async function parseFoodImage(file: File): Promise<MealEntry[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI API ключ не настроен');

  const base64 = await fileToBase64(file);
  const mimeType = file.type || 'image/jpeg';

  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: IMAGE_PROMPT },
          { inlineData: { mimeType, data: base64 } }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API ошибка: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('ИИ не смог распознать продукты на фото');

  const items: GeminiParsedItem[] = JSON.parse(jsonMatch[0]);
  return mapToEntries(items);
}

export async function parseFood(userText: string): Promise<MealEntry[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI API ключ не настроен');

  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `Пользователь написал: "${userText}"` }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API ошибка: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('ИИ не смог распознать продукты');

  const items: GeminiParsedItem[] = JSON.parse(jsonMatch[0]);
  return mapToEntries(items);
}

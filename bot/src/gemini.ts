import type { MealEntry } from './db.js';

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
- calories: калории для этой порции
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
- омлет из 2 яиц = 120г
- тост = 30г
- авокадо = 100г (половинка)

ВАЖНО: используй максимально простые и общепринятые названия продуктов.
Ответь ТОЛЬКО валидным JSON массивом, без markdown, без комментариев:
[{"name":"...","grams":...,"calories":...,"protein":...,"fat":...,"carbs":...}]`;

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

const VOICE_PROMPT = `Это аудиозапись человека, который описывает что он съел.
Сначала транскрибируй аудио, затем разбери на отдельные продукты.

Для каждого продукта укажи:
- name: название продукта по-русски
- grams: примерный вес порции в граммах
- calories: калории для этой порции
- protein: белки в граммах
- fat: жиры в граммах
- carbs: углеводы в граммах

Если не указан размер порции, используй стандартную (тарелка супа = 300г, яйцо = 60г и т.д.)

Ответь ТОЛЬКО валидным JSON массивом, без markdown, без комментариев:
[{"name":"...","grams":...,"calories":...,"protein":...,"fat":...,"carbs":...}]`;

function mapToEntries(items: GeminiParsedItem[]): MealEntry[] {
  return items.map((item, i) => ({
    id: `tg-${Date.now()}-${i}`,
    foodId: `tg-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
    foodName: item.name,
    grams: Math.round(item.grams),
    calories: Math.round(item.calories),
    protein: Math.round(item.protein * 10) / 10,
    fat: Math.round(item.fat * 10) / 10,
    carbs: Math.round(item.carbs * 10) / 10,
  }));
}

function parseGeminiResponse(text: string): GeminiParsedItem[] {
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Не удалось распознать продукты');
  return JSON.parse(jsonMatch[0]);
}

// Parse food from text description
export async function parseFoodText(apiKey: string, userText: string): Promise<MealEntry[]> {
  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `Пользователь написал: "${userText}"` },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return mapToEntries(parseGeminiResponse(text));
}

// Parse food from photo (base64)
export async function parseFoodImage(apiKey: string, base64: string, mimeType: string): Promise<MealEntry[]> {
  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: IMAGE_PROMPT },
          { inlineData: { mimeType, data: base64 } },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return mapToEntries(parseGeminiResponse(text));
}

// Parse food from voice (audio base64)
export async function parseFoodVoice(apiKey: string, base64: string, mimeType: string): Promise<MealEntry[]> {
  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: VOICE_PROMPT },
          { inlineData: { mimeType, data: base64 } },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return mapToEntries(parseGeminiResponse(text));
}

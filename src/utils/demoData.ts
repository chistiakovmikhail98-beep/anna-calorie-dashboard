import { UserProfile, DailyLog, MealEntry, WeightEntry, WellnessEntry, DailyActivityLog, ActivityEntry, MeasurementEntry, HealthTestResult } from '../types';

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

let idCounter = 1000;
function nextId(): string {
  return (idCounter++).toString();
}

function meal(name: string, grams: number, cal100: number, p100: number, f100: number, c100: number): MealEntry {
  const k = grams / 100;
  return {
    id: nextId(),
    foodId: nextId(),
    foodName: name,
    grams,
    calories: Math.round(cal100 * k),
    protein: Math.round(p100 * k * 10) / 10,
    fat: Math.round(f100 * k * 10) / 10,
    carbs: Math.round(c100 * k * 10) / 10,
  };
}

// ============ PROFILE ============

const DEMO_PROFILE: UserProfile = {
  name: 'Анна',
  gender: 'female',
  age: 28,
  height: 165,
  weight: 63.8,
  goalWeight: 58,
  activityLevel: 'moderate',
  goal: 'mild_lose',
};

// ============ DAILY FOOD LOGS (14 days) ============

const DAILY_LOGS: Record<string, DailyLog> = {};

// Day templates - realistic meals
const MEAL_TEMPLATES = [
  // Day 0 (today)
  {
    breakfast: [
      meal('Омлет из 2 яиц', 120, 154, 11, 12, 0.7),
      meal('Тост цельнозерновой', 30, 247, 8, 1.5, 46),
      meal('Авокадо', 40, 160, 2, 15, 8.5),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Куриная грудка на гриле', 150, 165, 31, 3.6, 0),
      meal('Гречка отварная', 150, 110, 4.2, 1.1, 21),
      meal('Салат из огурцов и помидоров', 150, 20, 0.8, 0.2, 4),
      meal('Оливковое масло', 10, 884, 0, 100, 0),
    ],
    dinner: [
      meal('Лосось запечённый', 130, 208, 20, 13, 0),
      meal('Брокколи на пару', 120, 34, 2.8, 0.4, 7),
    ],
    snack: [
      meal('Греческий йогурт 2%', 150, 59, 10, 2, 3.6),
      meal('Черника', 50, 57, 0.7, 0.3, 14),
    ],
    water: 1800,
  },
  // Day 1
  {
    breakfast: [
      meal('Овсянка на молоке', 200, 88, 3, 3.2, 12),
      meal('Банан', 100, 96, 1.5, 0.5, 21),
      meal('Грецкие орехи', 15, 654, 15, 65, 7),
      meal('Чай зелёный', 250, 1, 0.1, 0, 0),
    ],
    lunch: [
      meal('Индейка тушёная', 150, 144, 24, 5.6, 0),
      meal('Рис бурый', 150, 112, 2.6, 0.9, 23),
      meal('Салат с рукколой', 100, 25, 2.6, 0.7, 3.7),
    ],
    dinner: [
      meal('Треска запечённая', 150, 78, 17.7, 0.7, 0),
      meal('Кабачок на гриле', 150, 24, 0.6, 0.3, 4.6),
      meal('Помидоры черри', 80, 18, 0.9, 0.2, 3.9),
    ],
    snack: [
      meal('Творог 5%', 150, 121, 17.2, 5, 1.8),
      meal('Мёд', 10, 329, 0.8, 0, 80),
    ],
    water: 2000,
  },
  // Day 2
  {
    breakfast: [
      meal('Творожные панкейки', 180, 168, 14, 5.8, 16),
      meal('Малина', 60, 52, 1.2, 0.7, 12),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Говядина тушёная', 130, 232, 16, 18, 0),
      meal('Картофель запечённый', 150, 93, 2.5, 0.1, 21),
      meal('Квашеная капуста', 100, 19, 1.8, 0.1, 4.4),
    ],
    dinner: [
      meal('Тунец консервированный', 100, 96, 22, 1, 0),
      meal('Салат айсберг', 100, 14, 0.9, 0.1, 2.9),
      meal('Авокадо', 50, 160, 2, 15, 8.5),
    ],
    snack: [
      meal('Яблоко', 150, 52, 0.3, 0.2, 14),
      meal('Миндаль', 20, 579, 21, 49, 22),
    ],
    water: 1700,
  },
  // Day 3
  {
    breakfast: [
      meal('Яйцо варёное 2шт', 120, 155, 12.6, 10.6, 1.1),
      meal('Хлеб ржаной', 40, 259, 6.6, 1.2, 52),
      meal('Огурец', 80, 15, 0.7, 0.1, 3.6),
      meal('Кофе чёрный', 200, 2, 0.1, 0, 0),
    ],
    lunch: [
      meal('Куриный суп с лапшой', 300, 45, 3.5, 1.5, 5),
      meal('Хлеб цельнозерновой', 30, 247, 8, 1.5, 46),
      meal('Салат из свёклы', 100, 49, 1.5, 0.1, 11),
    ],
    dinner: [
      meal('Минтай на пару', 150, 72, 16, 1, 0),
      meal('Стручковая фасоль', 130, 31, 1.8, 0.3, 7),
      meal('Лимонный сок', 10, 22, 0.4, 0, 6),
    ],
    snack: [
      meal('Кефир 1%', 200, 40, 3, 1, 4),
    ],
    water: 1900,
  },
  // Day 4
  {
    breakfast: [
      meal('Смузи с бананом и шпинатом', 300, 45, 1.5, 0.5, 9),
      meal('Гранола', 40, 471, 10, 18, 62),
      meal('Греческий йогурт 2%', 100, 59, 10, 2, 3.6),
    ],
    lunch: [
      meal('Паста цельнозерновая', 80, 348, 13, 2.5, 66),
      meal('Куриная грудка', 120, 165, 31, 3.6, 0),
      meal('Соус песто', 15, 490, 5, 48, 6),
      meal('Пармезан', 10, 392, 36, 26, 4),
    ],
    dinner: [
      meal('Омлет со шпинатом', 150, 130, 9, 9, 2),
      meal('Помидор', 100, 20, 0.9, 0.2, 4.2),
    ],
    snack: [
      meal('Апельсин', 180, 47, 0.9, 0.1, 12),
      meal('Тёмный шоколад 70%', 15, 530, 8, 35, 50),
    ],
    water: 2100,
  },
  // Day 5
  {
    breakfast: [
      meal('Сырники из творога', 180, 183, 18, 5.7, 16),
      meal('Сметана 15%', 30, 162, 2.6, 15, 3.6),
      meal('Чай с лимоном', 250, 2, 0, 0, 0.5),
    ],
    lunch: [
      meal('Лосось на пару', 140, 208, 20, 13, 0),
      meal('Киноа', 100, 120, 4.4, 1.9, 21),
      meal('Салат из рукколы и черри', 120, 22, 2, 0.5, 3),
    ],
    dinner: [
      meal('Куриная котлета на пару', 120, 143, 18, 7, 2),
      meal('Цветная капуста запечённая', 150, 30, 2.5, 0.3, 5),
    ],
    snack: [
      meal('Ряженка 2.5%', 200, 54, 2.8, 2.5, 4.1),
      meal('Груша', 150, 57, 0.4, 0.1, 15),
    ],
    water: 1850,
  },
  // Day 6
  {
    breakfast: [
      meal('Тост с авокадо и яйцом', 150, 180, 9, 12, 11),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Борщ', 300, 32, 1.4, 1.4, 3.8),
      meal('Сметана 15%', 20, 162, 2.6, 15, 3.6),
      meal('Хлеб бородинский', 30, 208, 6.8, 1.3, 40),
      meal('Куриная грудка отварная', 100, 165, 31, 3.6, 0),
    ],
    dinner: [
      meal('Скумбрия запечённая', 120, 191, 18, 13, 0),
      meal('Салат из капусты', 150, 27, 1.8, 0.2, 4.7),
    ],
    snack: [
      meal('Банан', 100, 96, 1.5, 0.5, 21),
      meal('Арахисовая паста', 15, 588, 25, 50, 20),
    ],
    water: 1750,
  },
  // Day 7
  {
    breakfast: [
      meal('Каша рисовая на молоке', 250, 97, 2.5, 3, 16),
      meal('Яблоко', 120, 52, 0.3, 0.2, 14),
      meal('Чай зелёный', 250, 1, 0.1, 0, 0),
    ],
    lunch: [
      meal('Плов с курицей', 250, 152, 10, 7, 13),
      meal('Салат витаминный', 100, 22, 1, 0.1, 4.5),
    ],
    dinner: [
      meal('Творог 5% с зеленью', 200, 121, 17.2, 5, 1.8),
      meal('Огурец', 100, 15, 0.7, 0.1, 3.6),
    ],
    snack: [
      meal('Кешью', 20, 553, 18, 44, 30),
      meal('Сухофрукты (курага)', 30, 232, 5.2, 0.3, 51),
    ],
    water: 2000,
  },
  // Day 8
  {
    breakfast: [
      meal('Блины на кефире', 150, 170, 6, 5, 25),
      meal('Мёд', 15, 329, 0.8, 0, 80),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Говядина с овощами', 200, 150, 14, 8, 6),
      meal('Гречка отварная', 130, 110, 4.2, 1.1, 21),
    ],
    dinner: [
      meal('Салат Цезарь с курицей', 250, 128, 11, 7, 5),
    ],
    snack: [
      meal('Протеиновый батончик', 45, 380, 30, 10, 40),
    ],
    water: 1600,
  },
  // Day 9
  {
    breakfast: [
      meal('Яичница из 2 яиц', 120, 196, 13, 15, 1),
      meal('Бекон индюшачий', 30, 134, 17, 7, 1),
      meal('Тост', 30, 247, 8, 1.5, 46),
      meal('Кофе чёрный', 200, 2, 0.1, 0, 0),
    ],
    lunch: [
      meal('Рыбный суп', 300, 38, 3.4, 1.8, 2.5),
      meal('Хлеб ржаной', 30, 259, 6.6, 1.2, 52),
      meal('Сёмга слабосолёная', 50, 202, 22, 12, 0),
    ],
    dinner: [
      meal('Тефтели куриные', 150, 137, 17, 5, 6),
      meal('Спаржа на пару', 100, 20, 2.2, 0.1, 3.9),
    ],
    snack: [
      meal('Йогурт натуральный', 150, 60, 4, 1.5, 7),
      meal('Клубника', 80, 41, 0.7, 0.4, 7.7),
    ],
    water: 1950,
  },
  // Day 10
  {
    breakfast: [
      meal('Мюсли с молоком', 200, 96, 3, 3, 14),
      meal('Черника', 60, 57, 0.7, 0.3, 14),
      meal('Чай зелёный', 250, 1, 0.1, 0, 0),
    ],
    lunch: [
      meal('Фаршированный перец', 200, 104, 7.5, 5, 7.5),
      meal('Сметана 15%', 25, 162, 2.6, 15, 3.6),
    ],
    dinner: [
      meal('Дорадо запечённая', 150, 96, 18, 3, 0),
      meal('Салат из шпината', 100, 23, 2.9, 0.3, 3.6),
      meal('Оливковое масло', 8, 884, 0, 100, 0),
    ],
    snack: [
      meal('Рисовые хлебцы', 20, 380, 7, 2.5, 81),
      meal('Творожный сыр', 30, 317, 6, 31, 3.6),
    ],
    water: 1800,
  },
  // Day 11
  {
    breakfast: [
      meal('Омлет с сыром', 150, 185, 13, 14, 2),
      meal('Хлеб цельнозерновой', 30, 247, 8, 1.5, 46),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Тушёная капуста с мясом', 250, 65, 4, 3.5, 4),
      meal('Хлеб бородинский', 30, 208, 6.8, 1.3, 40),
    ],
    dinner: [
      meal('Креветки на гриле', 120, 99, 20, 1.7, 0.2),
      meal('Овощи гриль (кабачок, перец)', 150, 30, 1, 0.3, 6),
    ],
    snack: [
      meal('Орехи микс', 25, 607, 17, 53, 21),
      meal('Киви', 80, 61, 1.1, 0.5, 15),
    ],
    water: 2050,
  },
  // Day 12
  {
    breakfast: [
      meal('Каша овсяная на воде', 200, 68, 2.4, 1.4, 12),
      meal('Изюм', 15, 264, 2.9, 0.5, 66),
      meal('Мёд', 10, 329, 0.8, 0, 80),
      meal('Чай чёрный', 250, 1, 0, 0, 0.3),
    ],
    lunch: [
      meal('Котлета из индейки', 120, 144, 24, 5.6, 0),
      meal('Булгур', 130, 83, 3.1, 0.2, 19),
      meal('Огурцы и помидоры', 120, 18, 0.8, 0.2, 3.6),
    ],
    dinner: [
      meal('Форель на пару', 140, 119, 20, 3.5, 0),
      meal('Зелёный салат с маслом', 120, 35, 1.5, 2, 3),
    ],
    snack: [
      meal('Творог 2%', 150, 103, 18, 2, 3),
    ],
    water: 1900,
  },
  // Day 13
  {
    breakfast: [
      meal('Гранола с йогуртом', 180, 150, 6, 5, 22),
      meal('Манго', 80, 60, 0.8, 0.4, 15),
      meal('Кофе с молоком 2.5%', 200, 18, 1.2, 0.9, 1.8),
    ],
    lunch: [
      meal('Куриная шаурма (домашняя)', 250, 130, 10, 5, 12),
      meal('Соус йогуртовый', 30, 56, 3, 1.5, 6),
    ],
    dinner: [
      meal('Тунец стейк', 140, 144, 23, 5, 0),
      meal('Микс салат', 100, 20, 1.5, 0.2, 3.5),
      meal('Авокадо', 40, 160, 2, 15, 8.5),
    ],
    snack: [
      meal('Сыр моцарелла', 30, 240, 18, 17, 3),
      meal('Черри', 60, 18, 0.9, 0.2, 3.9),
    ],
    water: 1700,
  },
];

for (let i = 0; i < MEAL_TEMPLATES.length; i++) {
  const date = dateStr(i);
  const t = MEAL_TEMPLATES[i];
  DAILY_LOGS[date] = {
    date,
    meals: {
      breakfast: t.breakfast,
      lunch: t.lunch,
      dinner: t.dinner,
      snack: t.snack,
    },
    water: t.water,
  };
}

// ============ WEIGHT HISTORY (14 days, gradual decrease) ============

const WEIGHTS: WeightEntry[] = [];
const weightStart = 65.2;
const weightValues = [65.2, 65.0, 65.3, 64.9, 64.7, 64.5, 64.8, 64.3, 64.1, 64.4, 64.0, 63.8, 63.9, 63.8];
for (let i = 13; i >= 0; i--) {
  WEIGHTS.push({
    date: dateStr(i),
    weight: weightValues[13 - i],
  });
}

// ============ WELLNESS LOGS (14 days) ============

const WELLNESS_LOGS: Record<string, WellnessEntry> = {};
const wellnessData: Omit<WellnessEntry, 'date'>[] = [
  // today → 13 days ago (index 0 = today)
  { mood: 4, energy: 4, sleep: 5, digestion: 4, skin: 4, stress: 4, note: 'Хороший продуктивный день!' },
  { mood: 3, energy: 3, sleep: 4, digestion: 3, skin: 4, stress: 3, symptoms: ['Усталость'] },
  { mood: 4, energy: 4, sleep: 4, digestion: 5, skin: 4, stress: 4 },
  { mood: 5, energy: 5, sleep: 5, digestion: 4, skin: 5, stress: 5, note: 'Чувствую себя отлично! Много гуляла' },
  { mood: 3, energy: 3, sleep: 3, digestion: 3, skin: 3, stress: 2, symptoms: ['Головная боль', 'Раздражительность'], note: 'Плохо спала, стресс на работе' },
  { mood: 4, energy: 4, sleep: 4, digestion: 4, skin: 4, stress: 3 },
  { mood: 4, energy: 3, sleep: 4, digestion: 4, skin: 3, stress: 4, symptoms: ['Высыпания'] },
  { mood: 3, energy: 3, sleep: 3, digestion: 3, skin: 3, stress: 3 },
  { mood: 4, energy: 4, sleep: 5, digestion: 4, skin: 4, stress: 4, note: 'Выспалась наконец!' },
  { mood: 3, energy: 2, sleep: 2, digestion: 3, skin: 3, stress: 2, symptoms: ['Бессонница', 'Усталость', 'Тяга к сладкому'] },
  { mood: 3, energy: 3, sleep: 3, digestion: 2, skin: 3, stress: 3, symptoms: ['Вздутие'] },
  { mood: 4, energy: 4, sleep: 4, digestion: 4, skin: 3, stress: 3 },
  { mood: 3, energy: 3, sleep: 3, digestion: 3, skin: 3, stress: 3, note: 'Первый день на сопровождении!' },
  { mood: 2, energy: 2, sleep: 2, digestion: 2, skin: 2, stress: 2, symptoms: ['Усталость', 'Вздутие', 'Тяга к сладкому'], note: 'До начала программы - всё плохо' },
];

for (let i = 0; i < wellnessData.length; i++) {
  const date = dateStr(i);
  WELLNESS_LOGS[date] = { date, ...wellnessData[i] } as WellnessEntry;
}

// ============ ACTIVITY LOGS (14 days) ============

const ACTIVITY_LOGS: Record<string, DailyActivityLog> = {};

const activityData: (Omit<ActivityEntry, 'id' | 'date'>[] | null)[] = [
  // today
  [
    { type: 'yoga', name: 'Йога', durationMinutes: 45, intensity: 'moderate', caloriesBurned: 135 },
    { type: 'walking', name: 'Ходьба', durationMinutes: 30, intensity: 'moderate', caloriesBurned: 110 },
  ],
  // 1 day ago
  [
    { type: 'walking', name: 'Ходьба', durationMinutes: 40, intensity: 'moderate', caloriesBurned: 145 },
  ],
  // 2
  [
    { type: 'strength', name: 'Силовая', durationMinutes: 50, intensity: 'moderate', caloriesBurned: 250 },
  ],
  // 3
  [
    { type: 'running', name: 'Бег', durationMinutes: 25, intensity: 'moderate', caloriesBurned: 270 },
    { type: 'stretching', name: 'Растяжка', durationMinutes: 15, intensity: 'light', caloriesBurned: 30 },
  ],
  // 4 - rest day
  null,
  // 5
  [
    { type: 'pilates', name: 'Пилатес', durationMinutes: 45, intensity: 'moderate', caloriesBurned: 180 },
  ],
  // 6
  [
    { type: 'cycling', name: 'Велосипед', durationMinutes: 40, intensity: 'light', caloriesBurned: 160 },
  ],
  // 7
  [
    { type: 'dancing', name: 'Танцы', durationMinutes: 60, intensity: 'moderate', caloriesBurned: 270 },
  ],
  // 8
  [
    { type: 'walking', name: 'Ходьба', durationMinutes: 50, intensity: 'moderate', caloriesBurned: 175 },
  ],
  // 9
  [
    { type: 'strength', name: 'Силовая', durationMinutes: 45, intensity: 'vigorous', caloriesBurned: 270 },
    { type: 'walking', name: 'Ходьба', durationMinutes: 20, intensity: 'light', caloriesBurned: 50 },
  ],
  // 10 - rest
  null,
  // 11
  [
    { type: 'yoga', name: 'Йога', durationMinutes: 50, intensity: 'moderate', caloriesBurned: 150 },
  ],
  // 12
  [
    { type: 'swimming', name: 'Плавание', durationMinutes: 40, intensity: 'moderate', caloriesBurned: 240 },
  ],
  // 13
  [
    { type: 'walking', name: 'Ходьба', durationMinutes: 30, intensity: 'light', caloriesBurned: 75 },
  ],
];

for (let i = 0; i < activityData.length; i++) {
  const date = dateStr(i);
  const activities = activityData[i];
  if (activities) {
    ACTIVITY_LOGS[date] = {
      date,
      activities: activities.map(a => ({ ...a, id: nextId(), date })),
    };
  }
}

// ============ MEASUREMENTS (3 entries) ============

const MEASUREMENTS: MeasurementEntry[] = [
  {
    date: dateStr(13),
    waist: 72,
    hips: 98,
    chest: 90,
    thighLeft: 58,
    thighRight: 58,
    bodyFatPercent: 28,
  },
  {
    date: dateStr(7),
    waist: 71,
    hips: 97,
    chest: 89,
    thighLeft: 57.5,
    thighRight: 57.5,
    bodyFatPercent: 27.2,
  },
  {
    date: dateStr(0),
    waist: 70,
    hips: 96.5,
    chest: 89,
    thighLeft: 57,
    thighRight: 57,
    bodyFatPercent: 26.5,
  },
];

// ============ HEALTH TESTS (2 results) ============

const HEALTH_TESTS: HealthTestResult[] = [
  {
    id: nextId(),
    date: dateStr(13),
    testType: 'digestive',
    score: 55,
    answers: { 'dig-1': 3, 'dig-2': 3, 'dig-3': 2, 'dig-4': 3, 'dig-5': 4, 'dig-6': 3, 'dig-7': 2, 'dig-8': 3 },
  },
  {
    id: nextId(),
    date: dateStr(13),
    testType: 'stress',
    score: 45,
    answers: { 'str-1': 2, 'str-2': 2, 'str-3': 2, 'str-4': 3, 'str-5': 2, 'str-6': 2, 'str-7': 2, 'str-8': 2 },
  },
  {
    id: nextId(),
    date: dateStr(13),
    testType: 'hormonal',
    score: 60,
    answers: { 'hor-1': 3, 'hor-2': 3, 'hor-3': 3, 'hor-4': 2, 'hor-5': 3, 'hor-6': 3, 'hor-7': 3, 'hor-8': 3 },
  },
  {
    id: nextId(),
    date: dateStr(13),
    testType: 'immunity',
    score: 68,
    answers: { 'imm-1': 3, 'imm-2': 4, 'imm-3': 3, 'imm-4': 3, 'imm-5': 3, 'imm-6': 4, 'imm-7': 4, 'imm-8': 3 },
  },
];

// ============ STREAK ============

const STREAK = {
  current: 14,
  lastDate: dateStr(0),
};

// ============ INSTALL FUNCTION ============

export function installDemoData(): void {
  localStorage.setItem('anna_profile', JSON.stringify(DEMO_PROFILE));
  localStorage.setItem('anna_daily_logs', JSON.stringify(DAILY_LOGS));
  localStorage.setItem('anna_weight_history', JSON.stringify(WEIGHTS));
  localStorage.setItem('anna_wellness_logs', JSON.stringify(WELLNESS_LOGS));
  localStorage.setItem('anna_activity_logs', JSON.stringify(ACTIVITY_LOGS));
  localStorage.setItem('anna_measurements', JSON.stringify(MEASUREMENTS));
  localStorage.setItem('anna_health_tests', JSON.stringify(HEALTH_TESTS));
  localStorage.setItem('anna_streak', JSON.stringify(STREAK));
}

export function isDemoInstalled(): boolean {
  // Consider demo installed only if wellness logs exist (new feature)
  return localStorage.getItem('anna_wellness_logs') !== null;
}

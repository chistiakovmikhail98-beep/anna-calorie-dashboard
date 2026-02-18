export type Gender = 'female' | 'male';

export type Goal = 'lose' | 'mild_lose' | 'maintain' | 'gain';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'extra';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface UserProfile {
  name: string;
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
  goalWeight: number; // kg
  activityLevel: ActivityLevel;
  goal: Goal;
  telegramUsername?: string;
  telegramConnected?: boolean;
}

export interface CalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number; // grams
  fat: number; // grams
  carbs: number; // grams
  bmi: number;
  bmiCategory: string;
  waterMl: number;
  idealWeight: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number;
  fat: number;
  carbs: number;
  category: string;
}

export interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: {
    breakfast: MealEntry[];
    lunch: MealEntry[];
    dinner: MealEntry[];
    snack: MealEntry[];
  };
  water: number; // ml consumed
  weight?: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface MeasurementEntry {
  date: string;
  waist?: number;
  hips?: number;
  chest?: number;
  bicepLeft?: number;
  bicepRight?: number;
  thighLeft?: number;
  thighRight?: number;
  neck?: number;
  bodyFatPercent?: number;
  muscleMassKg?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  restingHeartRate?: number;
}

// Wellness diary
export type WellnessRating = 1 | 2 | 3 | 4 | 5;

export interface WellnessEntry {
  date: string; // YYYY-MM-DD
  mood: WellnessRating;
  energy: WellnessRating;
  sleep: WellnessRating;
  digestion: WellnessRating;
  skin: WellnessRating;
  stress: WellnessRating;
  note?: string;
  symptoms?: string[];
}

// Activity diary
export type ActivityType =
  | 'walking' | 'running' | 'cycling' | 'swimming' | 'yoga'
  | 'strength' | 'stretching' | 'dancing' | 'hiit' | 'pilates' | 'other';

export type ActivityIntensity = 'light' | 'moderate' | 'vigorous';

export interface ActivityEntry {
  id: string;
  date: string;
  type: ActivityType;
  name: string;
  durationMinutes: number;
  intensity: ActivityIntensity;
  caloriesBurned: number;
  note?: string;
}

export interface DailyActivityLog {
  date: string;
  activities: ActivityEntry[];
}

// Health tests
export type HealthTestType =
  | 'digestive' | 'hormonal' | 'stress' | 'immunity' | 'detox' | 'cardiovascular';

export interface HealthTestResult {
  id: string;
  date: string;
  testType: HealthTestType;
  score: number; // 0-100
  answers: Record<string, number>;
}

// Library content
export type ContentType = 'article' | 'lesson' | 'recipe' | 'guide';
export type ContentCategory = 'nutrition' | 'recipes' | 'health' | 'lifestyle';

export interface ContentItem {
  id: string;
  type: ContentType;
  category: ContentCategory;
  title: string;
  subtitle?: string;
  coverImage?: string;
  content: string; // markdown
  duration?: string;
  tags: string[];
  order: number;
  isFeatured?: boolean;
  createdAt: string;
  recipe?: {
    servings: number;
    prepTime: number;
    cookTime: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    ingredients: { name: string; amount: string }[];
    steps: string[];
  };
}

export interface ContentProgress {
  contentId: string;
  completedAt?: string;
  bookmarked: boolean;
}

export type Page =
  | 'dashboard' | 'calculator' | 'diary' | 'progress' | 'profile'
  | 'wellness' | 'activity' | 'measurements' | 'library';

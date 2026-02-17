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
}

export type Page = 'dashboard' | 'calculator' | 'diary' | 'progress' | 'profile';

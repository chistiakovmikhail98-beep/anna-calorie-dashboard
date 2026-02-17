import { Gender, ActivityLevel, Goal, CalculationResult } from '../types';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

const CALORIE_ADJUSTMENTS: Record<Goal, number> = {
  lose: -500,
  mild_lose: -300,
  maintain: 0,
  gain: 400,
};

export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  // Mifflin-St Jeor
  const base = (10 * weight) + (6.25 * height) - (5 * age);
  return gender === 'male' ? base + 5 : base - 161;
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

export function calculateTargetCalories(tdee: number, goal: Goal): number {
  return Math.max(1200, Math.round(tdee + CALORIE_ADJUSTMENTS[goal]));
}

export function calculateBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): string {
  if (bmi < 16) return 'Выраженный дефицит';
  if (bmi < 18.5) return 'Недостаточный вес';
  if (bmi < 25) return 'Норма';
  if (bmi < 30) return 'Избыточный вес';
  if (bmi < 35) return 'Ожирение I степени';
  if (bmi < 40) return 'Ожирение II степени';
  return 'Ожирение III степени';
}

export function calculateMacros(
  targetCalories: number,
  weight: number,
  goal: Goal
): { protein: number; fat: number; carbs: number } {
  let proteinPerKg: number;
  let fatPerKg: number;

  switch (goal) {
    case 'lose':
      proteinPerKg = 1.8;
      fatPerKg = 0.9;
      break;
    case 'mild_lose':
      proteinPerKg = 1.6;
      fatPerKg = 0.9;
      break;
    case 'gain':
      proteinPerKg = 2.0;
      fatPerKg = 1.0;
      break;
    default:
      proteinPerKg = 1.5;
      fatPerKg = 0.9;
  }

  const protein = Math.round(weight * proteinPerKg);
  const fat = Math.round(weight * fatPerKg);
  const proteinCal = protein * 4;
  const fatCal = fat * 9;
  const carbsCal = Math.max(0, targetCalories - proteinCal - fatCal);
  const carbs = Math.round(carbsCal / 4);

  return { protein, fat, carbs };
}

export function calculateWater(weight: number): number {
  return Math.round(weight * 30);
}

export function calculateIdealWeight(height: number, gender: Gender): number {
  // Devine formula
  const heightInches = height / 2.54;
  const over60 = Math.max(0, heightInches - 60);
  return gender === 'male'
    ? Math.round(50.0 + 2.3 * over60)
    : Math.round(45.5 + 2.3 * over60);
}

export function calculateAll(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  goal: Goal
): CalculationResult {
  const bmr = Math.round(calculateBMR(weight, height, age, gender));
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const { protein, fat, carbs } = calculateMacros(targetCalories, weight, goal);
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  const waterMl = calculateWater(weight);
  const idealWeight = calculateIdealWeight(height, gender);

  return { bmr, tdee, targetCalories, protein, fat, carbs, bmi, bmiCategory, waterMl, idealWeight };
}

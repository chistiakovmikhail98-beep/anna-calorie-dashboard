import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data.json');

// ─── Types (mirror dashboard types) ───

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

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DailyLog {
  date: string;
  meals: Record<MealType, MealEntry[]>;
  water: number;
  weight?: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

interface DB {
  dailyLogs: Record<string, DailyLog>;
  weightHistory: WeightEntry[];
}

// ─── Database operations ───

function load(): DB {
  if (!existsSync(DB_PATH)) {
    return { dailyLogs: {}, weightHistory: [] };
  }
  const raw = readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as DB;
}

function save(db: DB): void {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

function emptyLog(date: string): DailyLog {
  return {
    date,
    meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    water: 0,
  };
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// Determine meal type based on current time
export function getCurrentMealType(): MealType {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 15) return 'lunch';
  if (hour < 18) return 'snack';
  return 'dinner';
}

export function getDailyLog(date: string): DailyLog {
  const db = load();
  return db.dailyLogs[date] || emptyLog(date);
}

export function getAllLogs(): Record<string, DailyLog> {
  return load().dailyLogs;
}

export function addMealEntries(date: string, meal: MealType, entries: MealEntry[]): DailyLog {
  const db = load();
  if (!db.dailyLogs[date]) {
    db.dailyLogs[date] = emptyLog(date);
  }
  db.dailyLogs[date].meals[meal].push(...entries);
  save(db);
  return db.dailyLogs[date];
}

export function addWater(date: string, ml: number): number {
  const db = load();
  if (!db.dailyLogs[date]) {
    db.dailyLogs[date] = emptyLog(date);
  }
  db.dailyLogs[date].water = Math.max(0, db.dailyLogs[date].water + ml);
  save(db);
  return db.dailyLogs[date].water;
}

export function setWeight(date: string, weight: number): void {
  const db = load();
  if (!db.dailyLogs[date]) {
    db.dailyLogs[date] = emptyLog(date);
  }
  db.dailyLogs[date].weight = weight;

  // Also update weight history
  const existing = db.weightHistory.findIndex(w => w.date === date);
  if (existing >= 0) {
    db.weightHistory[existing].weight = weight;
  } else {
    db.weightHistory.push({ date, weight });
    db.weightHistory.sort((a, b) => a.date.localeCompare(b.date));
  }
  save(db);
}

export function getWeightHistory(): WeightEntry[] {
  return load().weightHistory;
}

// Remove a meal entry by id
export function removeMealEntry(date: string, meal: MealType, entryId: string): boolean {
  const db = load();
  const log = db.dailyLogs[date];
  if (!log) return false;

  const before = log.meals[meal].length;
  log.meals[meal] = log.meals[meal].filter(e => e.id !== entryId);
  if (log.meals[meal].length === before) return false;

  save(db);
  return true;
}

// Get today's summary
export function getTodaySummary(date: string): { calories: number; protein: number; fat: number; carbs: number; water: number } {
  const log = getDailyLog(date);
  const all = [
    ...log.meals.breakfast,
    ...log.meals.lunch,
    ...log.meals.dinner,
    ...log.meals.snack,
  ];
  return {
    calories: Math.round(all.reduce((s, m) => s + m.calories, 0)),
    protein: Math.round(all.reduce((s, m) => s + m.protein, 0)),
    fat: Math.round(all.reduce((s, m) => s + m.fat, 0)),
    carbs: Math.round(all.reduce((s, m) => s + m.carbs, 0)),
    water: log.water,
  };
}

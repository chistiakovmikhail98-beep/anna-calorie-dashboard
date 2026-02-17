import { UserProfile, DailyLog, WeightEntry, MeasurementEntry } from '../types';

const KEYS = {
  profile: 'anna_profile',
  dailyLogs: 'anna_daily_logs',
  weightHistory: 'anna_weight_history',
  measurements: 'anna_measurements',
  streak: 'anna_streak',
} as const;

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Profile
export function loadProfile(): UserProfile | null {
  return get<UserProfile | null>(KEYS.profile, null);
}

export function saveProfile(profile: UserProfile): void {
  set(KEYS.profile, profile);
}

// Daily logs
export function loadDailyLogs(): Record<string, DailyLog> {
  return get<Record<string, DailyLog>>(KEYS.dailyLogs, {});
}

export function saveDailyLog(log: DailyLog): void {
  const logs = loadDailyLogs();
  logs[log.date] = log;
  set(KEYS.dailyLogs, logs);
}

export function getTodayLog(): DailyLog {
  const today = new Date().toISOString().split('T')[0];
  const logs = loadDailyLogs();
  return logs[today] || {
    date: today,
    meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    water: 0,
  };
}

// Weight history
export function loadWeightHistory(): WeightEntry[] {
  return get<WeightEntry[]>(KEYS.weightHistory, []);
}

export function addWeightEntry(entry: WeightEntry): void {
  const history = loadWeightHistory();
  const existing = history.findIndex(e => e.date === entry.date);
  if (existing >= 0) {
    history[existing] = entry;
  } else {
    history.push(entry);
  }
  history.sort((a, b) => a.date.localeCompare(b.date));
  set(KEYS.weightHistory, history);
}

// Measurements
export function loadMeasurements(): MeasurementEntry[] {
  return get<MeasurementEntry[]>(KEYS.measurements, []);
}

export function addMeasurement(entry: MeasurementEntry): void {
  const data = loadMeasurements();
  data.push(entry);
  data.sort((a, b) => a.date.localeCompare(b.date));
  set(KEYS.measurements, data);
}

// Streak
export function getStreak(): { current: number; lastDate: string } {
  return get(KEYS.streak, { current: 0, lastDate: '' });
}

export function updateStreak(): number {
  const today = new Date().toISOString().split('T')[0];
  const streak = getStreak();

  if (streak.lastDate === today) return streak.current;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const newStreak = streak.lastDate === yesterdayStr
    ? streak.current + 1
    : 1;

  set(KEYS.streak, { current: newStreak, lastDate: today });
  return newStreak;
}

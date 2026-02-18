import { UserProfile, DailyLog, WeightEntry, MeasurementEntry, WellnessEntry, DailyActivityLog, HealthTestResult, ContentProgress } from '../types';

const KEYS = {
  profile: 'anna_profile',
  dailyLogs: 'anna_daily_logs',
  weightHistory: 'anna_weight_history',
  measurements: 'anna_measurements',
  streak: 'anna_streak',
  wellnessLogs: 'anna_wellness_logs',
  activityLogs: 'anna_activity_logs',
  healthTests: 'anna_health_tests',
  contentProgress: 'anna_content_progress',
  avatar: 'anna_avatar',
  progressPhotos: 'anna_progress_photos',
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

// Wellness logs
export function loadWellnessLogs(): Record<string, WellnessEntry> {
  return get<Record<string, WellnessEntry>>(KEYS.wellnessLogs, {});
}

export function saveWellnessEntry(entry: WellnessEntry): void {
  const logs = loadWellnessLogs();
  logs[entry.date] = entry;
  set(KEYS.wellnessLogs, logs);
}

export function getTodayWellness(): WellnessEntry | null {
  const today = new Date().toISOString().split('T')[0];
  const logs = loadWellnessLogs();
  return logs[today] || null;
}

// Activity logs
export function loadActivityLogs(): Record<string, DailyActivityLog> {
  return get<Record<string, DailyActivityLog>>(KEYS.activityLogs, {});
}

export function saveActivityLog(log: DailyActivityLog): void {
  const logs = loadActivityLogs();
  logs[log.date] = log;
  set(KEYS.activityLogs, logs);
}

export function getTodayActivityLog(): DailyActivityLog {
  const today = new Date().toISOString().split('T')[0];
  const logs = loadActivityLogs();
  return logs[today] || { date: today, activities: [] };
}

// Health tests
export function loadHealthTests(): HealthTestResult[] {
  return get<HealthTestResult[]>(KEYS.healthTests, []);
}

export function saveHealthTest(result: HealthTestResult): void {
  const tests = loadHealthTests();
  tests.push(result);
  set(KEYS.healthTests, tests);
}

// Content progress
export function loadContentProgress(): Record<string, ContentProgress> {
  return get<Record<string, ContentProgress>>(KEYS.contentProgress, {});
}

export function markContentComplete(contentId: string): void {
  const progress = loadContentProgress();
  progress[contentId] = {
    ...progress[contentId],
    contentId,
    completedAt: new Date().toISOString(),
    bookmarked: progress[contentId]?.bookmarked || false,
  };
  set(KEYS.contentProgress, progress);
}

export function toggleBookmark(contentId: string): void {
  const progress = loadContentProgress();
  progress[contentId] = {
    ...progress[contentId],
    contentId,
    bookmarked: !progress[contentId]?.bookmarked,
  };
  set(KEYS.contentProgress, progress);
}

// Avatar
export function loadAvatar(): string | null {
  return localStorage.getItem(KEYS.avatar);
}

export function saveAvatar(dataUrl: string): void {
  localStorage.setItem(KEYS.avatar, dataUrl);
}

// Progress photos
export interface ProgressPhoto {
  id: string;
  date: string;
  label: string; // 'before' | 'after' | date string
  dataUrl: string;
}

export function loadProgressPhotos(): ProgressPhoto[] {
  return get<ProgressPhoto[]>(KEYS.progressPhotos, []);
}

export function saveProgressPhoto(photo: ProgressPhoto): void {
  const photos = loadProgressPhotos();
  photos.push(photo);
  set(KEYS.progressPhotos, photos);
}

export function deleteProgressPhoto(id: string): void {
  const photos = loadProgressPhotos().filter(p => p.id !== id);
  set(KEYS.progressPhotos, photos);
}

// ─── Bot sync ───

const BOT_API = 'http://localhost:3333';

// Track IDs deleted from dashboard so sync doesn't re-add them
function getDeletedIds(): Set<string> {
  try {
    const raw = localStorage.getItem('anna_deleted_ids');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function addDeletedId(id: string): void {
  const ids = getDeletedIds();
  ids.add(id);
  localStorage.setItem('anna_deleted_ids', JSON.stringify([...ids]));
}

// Notify bot API about deletion (fire-and-forget)
export function notifyBotDelete(date: string, meal: string, entryId: string): void {
  addDeletedId(entryId);
  fetch(`${BOT_API}/api/logs/${date}/meals/${meal}/${entryId}`, {
    method: 'DELETE',
    signal: AbortSignal.timeout(2000),
  }).catch(() => {});
}

export async function syncFromBot(): Promise<boolean> {
  try {
    const res = await fetch(`${BOT_API}/api/logs`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return false;

    const botLogs: Record<string, DailyLog> = await res.json();
    const localLogs = loadDailyLogs();
    const deletedIds = getDeletedIds();

    let changed = false;
    for (const [date, botLog] of Object.entries(botLogs)) {
      const localLog = localLogs[date];
      if (!localLog) {
        // New day from bot — add entirely (but skip deleted)
        for (const meal of ['breakfast', 'lunch', 'dinner', 'snack'] as const) {
          botLog.meals[meal] = botLog.meals[meal].filter(e => !deletedIds.has(e.id));
        }
        localLogs[date] = botLog;
        changed = true;
      } else {
        // Merge: add bot entries that don't exist locally and aren't deleted
        for (const meal of ['breakfast', 'lunch', 'dinner', 'snack'] as const) {
          const localIds = new Set(localLog.meals[meal].map(e => e.id));
          const newEntries = botLog.meals[meal].filter(e =>
            !localIds.has(e.id) && !deletedIds.has(e.id)
          );
          if (newEntries.length > 0) {
            localLog.meals[meal].push(...newEntries);
            changed = true;
          }
        }
        // Merge water (take max)
        if (botLog.water > localLog.water) {
          localLog.water = botLog.water;
          changed = true;
        }
        // Merge weight
        if (botLog.weight && !localLog.weight) {
          localLog.weight = botLog.weight;
          changed = true;
        }
      }
    }

    if (changed) {
      set(KEYS.dailyLogs, localLogs);
    }
    return changed;
  } catch {
    // Bot API not available — that's fine
    return false;
  }
}

export async function isBotOnline(): Promise<boolean> {
  try {
    const res = await fetch(`${BOT_API}/api/today`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

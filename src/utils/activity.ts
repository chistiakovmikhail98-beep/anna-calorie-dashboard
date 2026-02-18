import { ActivityType, ActivityIntensity } from '../types';

const MET_VALUES: Record<ActivityType, Record<ActivityIntensity, number>> = {
  walking:    { light: 2.5, moderate: 3.5, vigorous: 5.0 },
  running:    { light: 6.0, moderate: 8.0, vigorous: 11.0 },
  cycling:    { light: 4.0, moderate: 6.0, vigorous: 10.0 },
  swimming:   { light: 4.0, moderate: 6.0, vigorous: 8.0 },
  yoga:       { light: 2.5, moderate: 3.0, vigorous: 4.0 },
  strength:   { light: 3.0, moderate: 5.0, vigorous: 6.0 },
  stretching: { light: 2.0, moderate: 2.5, vigorous: 3.0 },
  dancing:    { light: 3.0, moderate: 4.5, vigorous: 7.0 },
  hiit:       { light: 5.0, moderate: 8.0, vigorous: 12.0 },
  pilates:    { light: 3.0, moderate: 4.0, vigorous: 5.0 },
  other:      { light: 3.0, moderate: 5.0, vigorous: 7.0 },
};

export function estimateCaloriesBurned(
  type: ActivityType,
  intensity: ActivityIntensity,
  durationMinutes: number,
  weightKg: number
): number {
  const met = MET_VALUES[type][intensity];
  return Math.round((met * weightKg * durationMinutes) / 60);
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  walking: 'Ходьба',
  running: 'Бег',
  cycling: 'Велосипед',
  swimming: 'Плавание',
  yoga: 'Йога',
  strength: 'Силовая',
  stretching: 'Растяжка',
  dancing: 'Танцы',
  hiit: 'HIIT',
  pilates: 'Пилатес',
  other: 'Другое',
};

export const INTENSITY_LABELS: Record<ActivityIntensity, string> = {
  light: 'Лёгкая',
  moderate: 'Средняя',
  vigorous: 'Высокая',
};

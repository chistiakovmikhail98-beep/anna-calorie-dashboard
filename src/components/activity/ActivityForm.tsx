import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ActivityType, ActivityIntensity, ActivityEntry } from '../../types';
import { estimateCaloriesBurned, ACTIVITY_LABELS, INTENSITY_LABELS } from '../../utils/activity';
import { useUser } from '../../context/UserContext';
import {
  Footprints, Zap, Bike, Waves, Flower2, Dumbbell,
  StretchHorizontal, Music, Timer, PersonStanding, Activity
} from 'lucide-react';

const ACTIVITY_ICONS: Record<ActivityType, React.ElementType> = {
  walking: Footprints,
  running: Zap,
  cycling: Bike,
  swimming: Waves,
  yoga: Flower2,
  strength: Dumbbell,
  stretching: StretchHorizontal,
  dancing: Music,
  hiit: Timer,
  pilates: PersonStanding,
  other: Activity,
};

const DURATION_PRESETS = [15, 30, 45, 60, 90];

interface Props {
  onAdd: (entry: ActivityEntry) => void;
  onCancel: () => void;
}

export const ActivityForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const { profile } = useUser();
  const [type, setType] = useState<ActivityType | null>(null);
  const [intensity, setIntensity] = useState<ActivityIntensity>('moderate');
  const [duration, setDuration] = useState<number>(30);

  const calories = type && profile
    ? estimateCaloriesBurned(type, intensity, duration, profile.weight)
    : 0;

  const handleSubmit = () => {
    if (!type) return;
    const entry: ActivityEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type,
      name: ACTIVITY_LABELS[type],
      durationMinutes: duration,
      intensity,
      caloriesBurned: calories,
    };
    onAdd(entry);
  };

  return (
    <div className="border-2 border-olive/20 rounded-2xl p-5 mb-4 space-y-5">
      {/* Activity type grid */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Тип активности</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {(Object.keys(ACTIVITY_LABELS) as ActivityType[]).map(t => {
            const Icon = ACTIVITY_ICONS[t];
            return (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl text-xs transition-all ${
                  type === t
                    ? 'bg-olive/10 text-olive ring-2 ring-olive/30'
                    : 'bg-cream/40 text-gray-500 hover:bg-cream'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{ACTIVITY_LABELS[t]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Длительность (мин)</p>
        <div className="flex gap-2 flex-wrap">
          {DURATION_PRESETS.map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                duration === d
                  ? 'bg-raspberry text-white'
                  : 'bg-cream/60 text-gray-600 hover:bg-cream'
              }`}
            >
              {d}
            </button>
          ))}
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-20 bg-cream/50 border border-powder rounded-full py-2 px-4 text-sm text-center text-gray-700 focus:outline-none focus:border-raspberry"
          />
        </div>
      </div>

      {/* Intensity */}
      <div>
        <p className="text-sm text-gray-600 mb-3">Интенсивность</p>
        <div className="flex gap-2">
          {(['light', 'moderate', 'vigorous'] as ActivityIntensity[]).map(i => (
            <button
              key={i}
              onClick={() => setIntensity(i)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                intensity === i
                  ? 'bg-olive text-white'
                  : 'bg-cream/60 text-gray-600 hover:bg-cream'
              }`}
            >
              {INTENSITY_LABELS[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated calories */}
      {type && (
        <div className="bg-powder-light rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Ожидаемый расход</p>
          <p className="font-serif text-3xl text-raspberry">{calories} <span className="text-sm font-sans text-gray-400">ккал</span></p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Отмена
        </Button>
        <Button onClick={handleSubmit} disabled={!type} className="flex-1">
          Добавить
        </Button>
      </div>
    </div>
  );
};

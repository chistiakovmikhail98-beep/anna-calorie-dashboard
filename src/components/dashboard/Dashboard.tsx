import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { CalorieRings } from './CalorieRings';
import { QuickStats } from './QuickStats';
import { WeightMiniChart } from './WeightMiniChart';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { getTodayWellness, getTodayActivityLog } from '../../utils/storage';
import { WellnessEntry, DailyActivityLog } from '../../types';
import {
  UtensilsCrossed, Droplets, Heart, Activity, Clock, Flame,
  ArrowRight
} from 'lucide-react';

const MOOD_EMOJIS = ['', '😞', '😕', '😐', '🙂', '😊'];
const ENERGY_EMOJIS = ['', '🔋', '🪫', '⚡', '💪', '🚀'];

export const Dashboard: React.FC = () => {
  const { profile, calculations, setCurrentPage } = useUser();
  const [wellness, setWellness] = useState<WellnessEntry | null>(null);
  const [activity, setActivity] = useState<DailyActivityLog | null>(null);

  useEffect(() => {
    setWellness(getTodayWellness());
    setActivity(getTodayActivityLog());
  }, []);

  if (!profile || !calculations) {
    return (
      <div className="text-center py-20 animate-fade-up">
        <h3 className="font-serif text-3xl text-raspberry mb-4">Добро пожаловать!</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Для начала рассчитайте вашу дневную норму калорий в калькуляторе
        </p>
        <Button onClick={() => setCurrentPage('calculator')}>
          Перейти к калькулятору
        </Button>
      </div>
    );
  }

  const activityMinutes = activity?.activities.reduce((s, a) => s + a.durationMinutes, 0) || 0;
  const activityCalories = activity?.activities.reduce((s, a) => s + a.caloriesBurned, 0) || 0;

  return (
    <div className="space-y-6 animate-fade-up">
      <CalorieRings />

      {/* Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {[
          { label: 'Питание', icon: UtensilsCrossed, page: 'diary' as const, color: 'text-raspberry bg-raspberry/10' },
          { label: 'Вода', icon: Droplets, page: 'diary' as const, color: 'text-blue-500 bg-blue-50' },
          { label: 'Самочувствие', icon: Heart, page: 'wellness' as const, color: 'text-pink-500 bg-pink-50' },
          { label: 'Активность', icon: Activity, page: 'activity' as const, color: 'text-olive bg-olive/10' },
        ].map(action => (
          <button
            key={action.label}
            onClick={() => setCurrentPage(action.page)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all hover:shadow-sm ${action.color}`}
          >
            <action.icon size={14} />
            {action.label}
          </button>
        ))}
      </div>

      {/* Wellness & Activity mini-cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Wellness */}
        <Card className="!p-4 cursor-pointer" onClick={() => setCurrentPage('wellness')}>
          {wellness ? (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Самочувствие</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{MOOD_EMOJIS[wellness.mood]}</span>
                <span className="text-2xl">{ENERGY_EMOJIS[wellness.energy]}</span>
              </div>
            </div>
          ) : (
            <button onClick={() => setCurrentPage('wellness')} className="w-full text-left">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Самочувствие</p>
              <p className="text-sm text-raspberry font-medium flex items-center gap-1">
                Записать <ArrowRight size={14} />
              </p>
            </button>
          )}
        </Card>

        {/* Activity */}
        <Card className="!p-4 cursor-pointer" onClick={() => setCurrentPage('activity')}>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Активность</p>
          {activityMinutes > 0 ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-olive font-medium">
                <Clock size={14} /> {activityMinutes} мин
              </span>
              <span className="flex items-center gap-1 text-sm text-raspberry font-medium">
                <Flame size={14} /> {activityCalories}
              </span>
            </div>
          ) : (
            <p className="text-sm text-raspberry font-medium flex items-center gap-1">
              Записать <ArrowRight size={14} />
            </p>
          )}
        </Card>
      </div>

      <QuickStats />
      <WeightMiniChart />
    </div>
  );
};

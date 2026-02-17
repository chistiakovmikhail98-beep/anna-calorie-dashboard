import React from 'react';
import { Card } from '../ui/Card';
import { getStreak, loadWeightHistory, loadDailyLogs } from '../../utils/storage';
import { Flame, Trophy, Star, Zap, Award } from 'lucide-react';

interface Badge {
  icon: React.ElementType;
  title: string;
  desc: string;
  earned: boolean;
  color: string;
}

export const Achievements: React.FC = () => {
  const streak = getStreak();
  const weights = loadWeightHistory();
  const logs = Object.keys(loadDailyLogs()).length;

  const firstW = weights[0]?.weight || 0;
  const lastW = weights[weights.length - 1]?.weight || 0;
  const totalLost = firstW - lastW;

  const badges: Badge[] = [
    { icon: Flame, title: 'Первый день', desc: 'Заполнить дневник 1 день', earned: logs >= 1, color: 'text-raspberry' },
    { icon: Zap, title: '3 дня подряд', desc: 'Стрик 3 дня', earned: streak.current >= 3, color: 'text-bright-pink' },
    { icon: Star, title: 'Неделя силы', desc: 'Стрик 7 дней', earned: streak.current >= 7, color: 'text-olive' },
    { icon: Trophy, title: 'Марафонец', desc: 'Стрик 30 дней', earned: streak.current >= 30, color: 'text-olive-light' },
    { icon: Award, title: 'Минус 3 кг', desc: 'Сбросить 3 кг', earned: totalLost >= 3, color: 'text-raspberry' },
    { icon: Award, title: 'Минус 5 кг', desc: 'Сбросить 5 кг', earned: totalLost >= 5, color: 'text-bright-pink' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Достижения</p>
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-raspberry" />
          <span className="text-sm font-semibold text-raspberry">{streak.current} дней подряд</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
              badge.earned
                ? 'bg-cream'
                : 'bg-gray-50 opacity-40'
            }`}
          >
            <badge.icon size={28} className={badge.earned ? badge.color : 'text-gray-300'} />
            <p className="text-xs font-medium text-gray-700 text-center">{badge.title}</p>
            <p className="text-[9px] text-gray-400 text-center">{badge.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

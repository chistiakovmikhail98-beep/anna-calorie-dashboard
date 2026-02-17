import React from 'react';
import { Card } from '../ui/Card';
import { useUser } from '../../context/UserContext';
import { Scale, Target, Activity, Droplets } from 'lucide-react';

export const QuickStats: React.FC = () => {
  const { profile, calculations } = useUser();
  if (!profile || !calculations) return null;

  const stats = [
    { icon: Scale, label: 'Текущий вес', value: `${profile.weight} кг`, color: 'text-raspberry' },
    { icon: Target, label: 'Цель', value: `${profile.goalWeight} кг`, color: 'text-olive' },
    { icon: Activity, label: 'BMI', value: `${calculations.bmi}`, subtitle: calculations.bmiCategory, color: 'text-bright-pink' },
    { icon: Droplets, label: 'Вода/день', value: `${(calculations.waterMl / 1000).toFixed(1)} л`, color: 'text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Card key={i} className="p-4 text-center">
          <s.icon size={20} className={`mx-auto mb-2 ${s.color}`} />
          <p className={`font-serif text-xl ${s.color}`}>{s.value}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{s.label}</p>
          {s.subtitle && <p className="text-[10px] text-olive mt-0.5">{s.subtitle}</p>}
        </Card>
      ))}
    </div>
  );
};

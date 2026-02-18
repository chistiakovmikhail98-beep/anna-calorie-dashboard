import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { useUser } from '../../context/UserContext';
import { DailyLog } from '../../types';

interface Props {
  log?: DailyLog;
}

export const DaySummary: React.FC<Props> = ({ log }) => {
  const { todayLog, calculations } = useUser();
  const activeLog = log || todayLog;

  const totals = useMemo(() => {
    const all = [
      ...activeLog.meals.breakfast,
      ...activeLog.meals.lunch,
      ...activeLog.meals.dinner,
      ...activeLog.meals.snack,
    ];
    return {
      calories: Math.round(all.reduce((s, m) => s + m.calories, 0)),
      protein: Math.round(all.reduce((s, m) => s + m.protein, 0)),
      fat: Math.round(all.reduce((s, m) => s + m.fat, 0)),
      carbs: Math.round(all.reduce((s, m) => s + m.carbs, 0)),
    };
  }, [activeLog]);

  if (!calculations) return null;

  const calPct = Math.min(100, (totals.calories / calculations.targetCalories) * 100);

  return (
    <Card className="p-5 bg-gradient-to-r from-white to-powder-light">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">Итого за день</p>
        <p className="text-sm text-gray-400">
          {totals.calories} / <span className="text-raspberry font-medium">{calculations.targetCalories}</span> ккал
        </p>
      </div>
      <div className="w-full bg-cream rounded-full h-3 mb-4">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${calPct > 100 ? 'bg-bright-pink' : 'bg-raspberry'}`}
          style={{ width: `${Math.min(100, calPct)}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center text-xs">
        <div>
          <p className="text-raspberry font-medium">{totals.protein} / {calculations.protein}г</p>
          <p className="text-gray-400 uppercase tracking-wider">Белки</p>
        </div>
        <div>
          <p className="text-olive font-medium">{totals.fat} / {calculations.fat}г</p>
          <p className="text-gray-400 uppercase tracking-wider">Жиры</p>
        </div>
        <div>
          <p className="text-cream-dark font-medium">{totals.carbs} / {calculations.carbs}г</p>
          <p className="text-gray-400 uppercase tracking-wider">Углеводы</p>
        </div>
      </div>
    </Card>
  );
};

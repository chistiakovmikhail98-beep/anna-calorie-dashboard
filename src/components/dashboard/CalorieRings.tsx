import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { useUser } from '../../context/UserContext';

export const CalorieRings: React.FC = () => {
  const { calculations, todayLog } = useUser();
  if (!calculations) return null;

  const consumed = useMemo(() => {
    const allMeals = [
      ...todayLog.meals.breakfast,
      ...todayLog.meals.lunch,
      ...todayLog.meals.dinner,
      ...todayLog.meals.snack,
    ];
    return {
      calories: Math.round(allMeals.reduce((s, m) => s + m.calories, 0)),
      protein: Math.round(allMeals.reduce((s, m) => s + m.protein, 0)),
      water: todayLog.water,
    };
  }, [todayLog]);

  return (
    <Card className="p-8">
      <div className="flex flex-wrap justify-around items-center gap-6">
        <ProgressRing
          value={consumed.calories}
          max={calculations.targetCalories}
          size={140}
          strokeWidth={10}
          color="#D4213D"
          bgColor="#FAF0EF"
          label="Калории"
          unit="ккал"
        />
        <ProgressRing
          value={consumed.protein}
          max={calculations.protein}
          size={120}
          strokeWidth={8}
          color="#4E8A0C"
          bgColor="#F7F2EB"
          label="Белок"
          unit="г"
        />
        <ProgressRing
          value={consumed.water}
          max={calculations.waterMl}
          size={120}
          strokeWidth={8}
          color="#60A5FA"
          bgColor="#EFF6FF"
          label="Вода"
          unit="мл"
        />
      </div>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          Осталось: <span className="text-raspberry font-semibold">{Math.max(0, calculations.targetCalories - consumed.calories)}</span> ккал
        </p>
      </div>
    </Card>
  );
};

import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { MealSection } from './MealSection';
import { DaySummary } from './DaySummary';
import { FoodSearch } from './FoodSearch';
import { AiFood } from './AiFood';
import { MealType, MealEntry, FoodItem } from '../../types';
import { Droplets, Plus, Minus, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { updateStreak } from '../../utils/storage';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

export const FoodDiary: React.FC = () => {
  const { todayLog, setTodayLog, calculations } = useUser();
  const [activeMeal, setActiveMeal] = useState<MealType | null>(null);
  const [aiMeal, setAiMeal] = useState<MealType | null>(null);

  const handleAddFood = (meal: MealType, food: FoodItem, grams: number) => {
    const entry: MealEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      foodId: food.id,
      foodName: food.name,
      grams,
      calories: Math.round((food.calories * grams) / 100),
      protein: Math.round((food.protein * grams) / 100 * 10) / 10,
      fat: Math.round((food.fat * grams) / 100 * 10) / 10,
      carbs: Math.round((food.carbs * grams) / 100 * 10) / 10,
    };

    const updated = {
      ...todayLog,
      meals: {
        ...todayLog.meals,
        [meal]: [...todayLog.meals[meal], entry],
      },
    };
    setTodayLog(updated);
    updateStreak();
    setActiveMeal(null);
  };

  const handleAddAiEntries = (meal: MealType, entries: MealEntry[]) => {
    const updated = {
      ...todayLog,
      meals: {
        ...todayLog.meals,
        [meal]: [...todayLog.meals[meal], ...entries],
      },
    };
    setTodayLog(updated);
    updateStreak();
    setAiMeal(null);
  };

  const handleRemoveFood = (meal: MealType, entryId: string) => {
    const updated = {
      ...todayLog,
      meals: {
        ...todayLog.meals,
        [meal]: todayLog.meals[meal].filter(e => e.id !== entryId),
      },
    };
    setTodayLog(updated);
  };

  const handleWater = (amount: number) => {
    const updated = {
      ...todayLog,
      water: Math.max(0, todayLog.water + amount),
    };
    setTodayLog(updated);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Дневник <span className="italic font-light">питания</span>
        </h3>
        <p className="text-gray-400 text-sm">Записывайте, что вы едите, и следите за нормой</p>
      </div>

      <DaySummary />

      {/* Water tracker */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets size={20} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Вода</p>
              <p className="text-xs text-gray-400">
                {todayLog.water} / {calculations?.waterMl || 2100} мл
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleWater(-250)} className="w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark/30 transition-colors">
              <Minus size={14} className="text-gray-500" />
            </button>
            <span className="text-sm font-medium text-blue-500 w-16 text-center">{todayLog.water} мл</span>
            <button onClick={() => handleWater(250)} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <Plus size={14} className="text-blue-500" />
            </button>
          </div>
        </div>
        <div className="w-full bg-blue-50 rounded-full h-2 mt-3">
          <div
            className="bg-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (todayLog.water / (calculations?.waterMl || 2100)) * 100)}%` }}
          />
        </div>
      </Card>

      {/* Meals */}
      {(Object.keys(MEAL_LABELS) as MealType[]).map(meal => (
        <div key={meal}>
          <MealSection
            meal={meal}
            label={MEAL_LABELS[meal]}
            entries={todayLog.meals[meal]}
            onAdd={() => { setActiveMeal(meal); setAiMeal(null); }}
            onAi={() => { setAiMeal(meal); setActiveMeal(null); }}
            onRemove={(id) => handleRemoveFood(meal, id)}
          />
          {activeMeal === meal && (
            <FoodSearch
              onSelect={(food, grams) => handleAddFood(meal, food, grams)}
              onClose={() => setActiveMeal(null)}
            />
          )}
          {aiMeal === meal && (
            <AiFood
              onAdd={(entries) => handleAddAiEntries(meal, entries)}
              onClose={() => setAiMeal(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useUser } from '../../context/UserContext';
import { MealSection } from './MealSection';
import { DaySummary } from './DaySummary';
import { FoodSearch } from './FoodSearch';
import { AiFood } from './AiFood';
import { MealType, MealEntry, FoodItem, DailyLog } from '../../types';
import { Droplets, Plus, Minus, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Card } from '../ui/Card';
import { updateStreak, loadDailyLogs, notifyBotDelete } from '../../utils/storage';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

function formatDateRu(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' });
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

const EMPTY_LOG: DailyLog = {
  date: '',
  meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
  water: 0,
};

export const FoodDiary: React.FC = () => {
  const { todayLog, setTodayLog, calculations } = useUser();
  const [activeMeal, setActiveMeal] = useState<MealType | null>(null);
  const [aiMeal, setAiMeal] = useState<MealType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getToday);

  const today = getToday();
  const isToday = selectedDate === today;

  // Load historical log for non-today dates
  const viewLog = useMemo(() => {
    if (isToday) return todayLog;
    const logs = loadDailyLogs();
    return logs[selectedDate] || { ...EMPTY_LOG, date: selectedDate };
  }, [selectedDate, isToday, todayLog]);

  // Get available dates for navigation hints
  const availableDates = useMemo(() => {
    const logs = loadDailyLogs();
    return Object.keys(logs).sort();
  }, [selectedDate]); // refresh when date changes

  const goToday = () => setSelectedDate(today);
  const goPrev = () => setSelectedDate(addDays(selectedDate, -1));
  const goNext = () => {
    const next = addDays(selectedDate, 1);
    if (next <= today) setSelectedDate(next);
  };

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
    // Also delete from bot DB so sync doesn't re-add it
    notifyBotDelete(todayLog.date, meal, entryId);
  };

  const handleWater = (amount: number) => {
    const updated = {
      ...todayLog,
      water: Math.max(0, todayLog.water + amount),
    };
    setTodayLog(updated);
  };

  // Check if selected date has data
  const hasData = viewLog.meals.breakfast.length > 0 ||
    viewLog.meals.lunch.length > 0 ||
    viewLog.meals.dinner.length > 0 ||
    viewLog.meals.snack.length > 0 ||
    viewLog.water > 0;

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Дневник <span className="italic font-light">питания</span>
        </h3>
        <p className="text-gray-400 text-sm">Записывайте, что вы едите, и следите за нормой</p>
      </div>

      {/* Date navigation */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            className="w-9 h-9 rounded-full bg-cream/60 flex items-center justify-center hover:bg-cream transition-colors"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>

          <div className="flex flex-col items-center">
            <button
              onClick={goToday}
              className="flex items-center gap-2"
            >
              <CalendarDays size={16} className="text-raspberry/60" />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {isToday ? 'Сегодня' : formatDateRu(selectedDate)}
              </span>
            </button>
            {isToday && (
              <span className="text-[10px] text-gray-400 mt-0.5 capitalize">
                {formatDateRu(selectedDate)}
              </span>
            )}
            {!isToday && (
              <button
                onClick={goToday}
                className="text-[10px] text-raspberry font-medium mt-0.5 hover:underline"
              >
                Вернуться к сегодня
              </button>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={isToday}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isToday
                ? 'bg-cream/30 cursor-not-allowed'
                : 'bg-cream/60 hover:bg-cream'
            }`}
          >
            <ChevronRight size={18} className={isToday ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>

        {/* Quick date buttons */}
        {availableDates.length > 1 && (
          <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 -mx-1 px-1">
            {availableDates.slice(-7).map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                  selectedDate === date
                    ? 'bg-raspberry text-white shadow-sm'
                    : 'bg-cream/50 text-gray-500 hover:bg-cream'
                }`}
              >
                {date === today ? 'Сегодня' : new Date(date + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </button>
            ))}
          </div>
        )}
      </Card>

      <DaySummary log={viewLog} />

      {/* Water tracker */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets size={20} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">Вода</p>
              <p className="text-xs text-gray-400">
                {viewLog.water} / {calculations?.waterMl || 2100} мл
              </p>
            </div>
          </div>
          {isToday && (
            <div className="flex items-center gap-2">
              <button onClick={() => handleWater(-250)} className="w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark/30 transition-colors">
                <Minus size={14} className="text-gray-500" />
              </button>
              <span className="text-sm font-medium text-blue-500 w-16 text-center">{viewLog.water} мл</span>
              <button onClick={() => handleWater(250)} className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Plus size={14} className="text-blue-500" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full bg-blue-50 rounded-full h-2 mt-3">
          <div
            className="bg-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (viewLog.water / (calculations?.waterMl || 2100)) * 100)}%` }}
          />
        </div>
      </Card>

      {/* Empty state for past day */}
      {!isToday && !hasData && (
        <Card className="p-8 text-center">
          <CalendarDays size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">Нет записей за этот день</p>
        </Card>
      )}

      {/* Meals */}
      {(hasData || isToday) && (Object.keys(MEAL_LABELS) as MealType[]).map(meal => (
        <div key={meal}>
          <MealSection
            meal={meal}
            label={MEAL_LABELS[meal]}
            entries={viewLog.meals[meal]}
            onAdd={() => { setActiveMeal(meal); setAiMeal(null); }}
            onAi={() => { setAiMeal(meal); setActiveMeal(null); }}
            onRemove={(id) => handleRemoveFood(meal, id)}
            readOnly={!isToday}
          />
          {isToday && activeMeal === meal && (
            <FoodSearch
              onSelect={(food, grams) => handleAddFood(meal, food, grams)}
              onClose={() => setActiveMeal(null)}
            />
          )}
          {isToday && aiMeal === meal && (
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

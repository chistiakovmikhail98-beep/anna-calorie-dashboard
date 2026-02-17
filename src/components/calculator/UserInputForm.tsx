import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { UserProfile, Gender, ActivityLevel, Goal } from '../../types';

interface Props {
  onSubmit: (data: UserProfile) => void;
  initialData: UserProfile | null;
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Сидячий (офис, мало движения)' },
  { value: 'light', label: 'Лёгкая активность (1-3 тренировки/нед)' },
  { value: 'moderate', label: 'Средняя (3-5 тренировок/нед)' },
  { value: 'active', label: 'Высокая (6-7 тренировок/нед)' },
  { value: 'extra', label: 'Экстра (2 тренировки/день)' },
];

const GOAL_OPTIONS: { value: Goal; label: string; desc: string }[] = [
  { value: 'lose', label: 'Похудение', desc: '−500 ккал' },
  { value: 'mild_lose', label: 'Мягкое похудение', desc: '−300 ккал' },
  { value: 'maintain', label: 'Поддержание', desc: '0 ккал' },
  { value: 'gain', label: 'Набор массы', desc: '+400 ккал' },
];

export const UserInputForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [gender, setGender] = useState<Gender>(initialData?.gender || 'female');
  const [age, setAge] = useState(initialData?.age || 35);
  const [height, setHeight] = useState(initialData?.height || 165);
  const [weight, setWeight] = useState(initialData?.weight || 70);
  const [goalWeight, setGoalWeight] = useState(initialData?.goalWeight || 60);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(initialData?.activityLevel || 'light');
  const [goal, setGoal] = useState<Goal>(initialData?.goal || 'lose');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, gender, age, height, weight, goalWeight, activityLevel, goal });
  };

  const inputClass = "w-full bg-cream/50 border border-powder rounded-2xl py-3 px-5 text-gray-700 focus:outline-none focus:border-raspberry focus:bg-white transition-colors text-sm";
  const labelClass = "text-xs uppercase tracking-[0.2em] text-olive font-medium mb-2 block";

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className={labelClass}>Ваше имя</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Как вас зовут?"
            className={inputClass}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Пол</label>
          <div className="flex gap-3">
            {(['female', 'male'] as Gender[]).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
                  gender === g
                    ? 'bg-raspberry text-white shadow-md'
                    : 'bg-cream text-gray-600 hover:bg-cream-dark/30'
                }`}
              >
                {g === 'female' ? 'Женский' : 'Мужской'}
              </button>
            ))}
          </div>
        </div>

        {/* Age, Height, Weight row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Возраст</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(+e.target.value)}
              min={16}
              max={99}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Рост (см)</label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(+e.target.value)}
              min={100}
              max={250}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Вес (кг)</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(+e.target.value)}
              min={30}
              max={300}
              step={0.1}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Goal weight */}
        <div>
          <label className={labelClass}>Желаемый вес (кг)</label>
          <input
            type="number"
            value={goalWeight}
            onChange={e => setGoalWeight(+e.target.value)}
            min={30}
            max={200}
            step={0.1}
            className={inputClass}
          />
        </div>

        {/* Activity */}
        <div>
          <label className={labelClass}>Уровень активности</label>
          <select
            value={activityLevel}
            onChange={e => setActivityLevel(e.target.value as ActivityLevel)}
            className={inputClass}
          >
            {ACTIVITY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div>
          <label className={labelClass}>Цель</label>
          <div className="grid grid-cols-2 gap-3">
            {GOAL_OPTIONS.map(o => (
              <button
                key={o.value}
                type="button"
                onClick={() => setGoal(o.value)}
                className={`py-3 px-4 rounded-2xl text-left transition-all ${
                  goal === o.value
                    ? 'bg-raspberry text-white shadow-md'
                    : 'bg-cream text-gray-600 hover:bg-cream-dark/30'
                }`}
              >
                <span className="text-sm font-medium block">{o.label}</span>
                <span className={`text-[10px] ${goal === o.value ? 'text-white/70' : 'text-gray-400'}`}>{o.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Рассчитать норму
        </Button>
      </form>
    </Card>
  );
};

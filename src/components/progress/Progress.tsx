import React, { useState } from 'react';
import { WeightChart } from './WeightChart';
import { Achievements } from './Achievements';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useUser } from '../../context/UserContext';
import { addWeightEntry, loadWeightHistory } from '../../utils/storage';

export const Progress: React.FC = () => {
  const { profile } = useUser();
  const [weight, setWeight] = useState(profile?.weight || 70);
  const [history, setHistory] = useState(loadWeightHistory);

  const handleAddWeight = () => {
    const today = new Date().toISOString().split('T')[0];
    addWeightEntry({ date: today, weight });
    setHistory(loadWeightHistory());
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Ваш <span className="italic font-light">прогресс</span>
        </h3>
        <p className="text-gray-400 text-sm">Отслеживайте изменения и отмечайте достижения</p>
      </div>

      {/* Weight entry */}
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Записать вес сегодня</p>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(+e.target.value)}
              step={0.1}
              min={30}
              max={300}
              className="w-full bg-cream/50 border border-powder rounded-2xl py-3 px-5 text-gray-700 focus:outline-none focus:border-raspberry text-sm"
            />
          </div>
          <Button onClick={handleAddWeight} variant="primary" className="px-6">
            Сохранить
          </Button>
        </div>
      </Card>

      <WeightChart data={history} goalWeight={profile?.goalWeight} />
      <Achievements />
    </div>
  );
};

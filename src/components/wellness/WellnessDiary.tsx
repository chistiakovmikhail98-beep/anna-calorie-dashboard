import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { WellnessCheckIn } from './WellnessCheckIn';
import { WellnessHistory } from './WellnessHistory';
import { getTodayWellness, loadWellnessLogs } from '../../utils/storage';
import { WellnessEntry } from '../../types';

export const WellnessDiary: React.FC = () => {
  const [todayEntry, setTodayEntry] = useState<WellnessEntry | null>(null);
  const [allLogs, setAllLogs] = useState<Record<string, WellnessEntry>>({});

  useEffect(() => {
    setTodayEntry(getTodayWellness());
    setAllLogs(loadWellnessLogs());
  }, []);

  const handleSave = () => {
    setTodayEntry(getTodayWellness());
    setAllLogs(loadWellnessLogs());
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Дневник <span className="italic">самочувствия</span>
        </h3>
        <p className="text-gray-500 text-sm">Отслеживайте своё состояние каждый день</p>
      </div>

      <WellnessCheckIn existing={todayEntry} onSave={handleSave} />

      {Object.keys(allLogs).length > 0 && (
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Динамика за неделю</p>
          <WellnessHistory logs={allLogs} />
        </Card>
      )}
    </div>
  );
};

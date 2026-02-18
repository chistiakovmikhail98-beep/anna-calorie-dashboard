import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ActivityForm } from './ActivityForm';
import { getTodayActivityLog, saveActivityLog, loadActivityLogs } from '../../utils/storage';
import { ACTIVITY_LABELS, INTENSITY_LABELS } from '../../utils/activity';
import { DailyActivityLog, ActivityEntry } from '../../types';
import { Plus, Trash2, Flame, Clock, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ActivityDiary: React.FC = () => {
  const [todayLog, setTodayLog] = useState<DailyActivityLog>(getTodayActivityLog());
  const [showForm, setShowForm] = useState(false);
  const [weekData, setWeekData] = useState<{ day: string; minutes: number }[]>([]);

  useEffect(() => {
    const logs = loadActivityLogs();
    const data: { day: string; minutes: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const totalMin = logs[dateStr]?.activities.reduce((s, a) => s + a.durationMinutes, 0) || 0;
      data.push({ day: dayNames[d.getDay()], minutes: totalMin });
    }
    setWeekData(data);
  }, [todayLog]);

  const handleAdd = (entry: ActivityEntry) => {
    const updated = {
      ...todayLog,
      activities: [...todayLog.activities, entry],
    };
    saveActivityLog(updated);
    setTodayLog(updated);
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    const updated = {
      ...todayLog,
      activities: todayLog.activities.filter(a => a.id !== id),
    };
    saveActivityLog(updated);
    setTodayLog(updated);
  };

  const totalMinutes = todayLog.activities.reduce((s, a) => s + a.durationMinutes, 0);
  const totalCalories = todayLog.activities.reduce((s, a) => s + a.caloriesBurned, 0);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Дневник <span className="italic">активности</span>
        </h3>
        <p className="text-gray-500 text-sm">Записывайте свои тренировки и движение</p>
      </div>

      {/* Today summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-4 text-center">
          <Activity size={20} className="text-olive mx-auto mb-1" />
          <p className="font-serif text-2xl text-raspberry">{todayLog.activities.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Активности</p>
        </Card>
        <Card className="!p-4 text-center">
          <Clock size={20} className="text-olive mx-auto mb-1" />
          <p className="font-serif text-2xl text-raspberry">{totalMinutes}</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Минут</p>
        </Card>
        <Card className="!p-4 text-center">
          <Flame size={20} className="text-olive mx-auto mb-1" />
          <p className="font-serif text-2xl text-raspberry">{totalCalories}</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">ккал</p>
        </Card>
      </div>

      {/* Activity list */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Сегодня</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 text-raspberry text-sm font-medium hover:text-bright-pink transition-colors"
          >
            <Plus size={16} />
            Добавить
          </button>
        </div>

        {showForm && <ActivityForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />}

        {todayLog.activities.length === 0 && !showForm && (
          <p className="text-sm text-gray-400 text-center py-6">
            Пока нет активностей. Добавьте первую!
          </p>
        )}

        <div className="space-y-3 mt-3">
          {todayLog.activities.map(a => (
            <div key={a.id} className="flex items-center justify-between bg-cream/40 rounded-2xl px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-700">{ACTIVITY_LABELS[a.type]}</p>
                <p className="text-xs text-gray-400">
                  {a.durationMinutes} мин · {INTENSITY_LABELS[a.intensity]} · {a.caloriesBurned} ккал
                </p>
              </div>
              <button
                onClick={() => handleRemove(a.id)}
                className="text-gray-300 hover:text-raspberry transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Week chart */}
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Активность за неделю</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weekData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <YAxis hide />
            <Tooltip
              formatter={(value: number) => [`${value} мин`, 'Активность']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="minutes" fill="#4E8A0C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

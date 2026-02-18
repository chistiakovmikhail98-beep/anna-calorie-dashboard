import React, { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { WellnessEntry } from '../../types';

interface Props {
  logs: Record<string, WellnessEntry>;
}

const METRIC_LABELS: Record<string, string> = {
  mood: 'Настроение',
  energy: 'Энергия',
  sleep: 'Сон',
  digestion: 'Пищеварение',
  skin: 'Кожа',
  stress: 'Стресс',
};

export const WellnessHistory: React.FC<Props> = ({ logs }) => {
  const weekData = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const recentEntries = Object.values(logs).filter(e => {
      const d = new Date(e.date);
      return d >= weekAgo && d <= now;
    });

    if (recentEntries.length === 0) return null;

    const metrics = ['mood', 'energy', 'sleep', 'digestion', 'skin', 'stress'] as const;

    return metrics.map(key => {
      const avg = recentEntries.reduce((sum, e) => sum + e[key], 0) / recentEntries.length;
      return {
        metric: METRIC_LABELS[key],
        value: Math.round(avg * 10) / 10,
        fullMark: 5,
      };
    });
  }, [logs]);

  if (!weekData) {
    return <p className="text-sm text-gray-400 text-center py-4">Пока нет данных за неделю</p>;
  }

  const avgScore = weekData.reduce((s, d) => s + d.value, 0) / weekData.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Средний балл за неделю</p>
        <p className="font-serif text-2xl text-raspberry">{avgScore.toFixed(1)}<span className="text-sm text-gray-400">/5</span></p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={weekData}>
          <PolarGrid stroke="#E5D8CC" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fontSize: 11, fill: '#6B7280' }}
          />
          <Radar
            name="Самочувствие"
            dataKey="value"
            stroke="#D4213D"
            fill="#D4213D"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

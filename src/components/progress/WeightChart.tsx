import React from 'react';
import { Card } from '../ui/Card';
import { WeightEntry } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  data: WeightEntry[];
  goalWeight?: number;
}

export const WeightChart: React.FC<Props> = ({ data, goalWeight }) => {
  if (data.length < 2) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-gray-400">Добавьте минимум 2 записи веса, чтобы увидеть график</p>
      </Card>
    );
  }

  const chartData = data.slice(-30).map(e => ({
    date: e.date.slice(5),
    weight: e.weight,
  }));

  // Moving average (3-day)
  const withMA = chartData.map((point, i, arr) => {
    if (i < 2) return { ...point, trend: point.weight };
    const avg = (arr[i - 2].weight + arr[i - 1].weight + point.weight) / 3;
    return { ...point, trend: Math.round(avg * 10) / 10 };
  });

  const firstWeight = data[0]?.weight;
  const lastWeight = data[data.length - 1]?.weight;
  const diff = lastWeight - firstWeight;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">График веса</p>
        {data.length >= 2 && (
          <p className={`text-sm font-medium ${diff <= 0 ? 'text-olive' : 'text-raspberry'}`}>
            {diff > 0 ? '+' : ''}{diff.toFixed(1)} кг
          </p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={withMA}>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
            formatter={(val, name) => [
              `${val} кг`,
              name === 'weight' ? 'Вес' : 'Тренд',
            ]}
          />
          {goalWeight && (
            <ReferenceLine y={goalWeight} stroke="#8FBB3A" strokeDasharray="6 4" label={{ value: `Цель: ${goalWeight}`, fill: '#4E8A0C', fontSize: 10, position: 'right' }} />
          )}
          <Line type="monotone" dataKey="weight" stroke="#EFBFBA" strokeWidth={1.5} dot={{ fill: '#EFBFBA', r: 3 }} />
          <Line type="monotone" dataKey="trend" stroke="#D4213D" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

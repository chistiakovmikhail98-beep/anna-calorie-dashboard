import React from 'react';
import { Card } from '../ui/Card';
import { loadWeightHistory } from '../../utils/storage';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const WeightMiniChart: React.FC = () => {
  const history = loadWeightHistory();
  const last7 = history.slice(-7);

  if (last7.length < 2) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-gray-400">
          Добавьте минимум 2 записи веса в разделе «Прогресс», чтобы увидеть график
        </p>
      </Card>
    );
  }

  const data = last7.map(e => ({
    date: e.date.slice(5), // MM-DD
    weight: e.weight,
  }));

  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Динамика веса</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
            formatter={(val) => [`${val} кг`, 'Вес']}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#D4213D"
            strokeWidth={2.5}
            dot={{ fill: '#D4213D', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

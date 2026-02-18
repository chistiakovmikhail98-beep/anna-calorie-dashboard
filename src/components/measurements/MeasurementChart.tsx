import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MeasurementEntry } from '../../types';

const CHART_METRICS: { key: keyof MeasurementEntry; label: string; color: string }[] = [
  { key: 'waist', label: 'Талия', color: '#D4213D' },
  { key: 'hips', label: 'Бёдра', color: '#E63D65' },
  { key: 'chest', label: 'Грудь', color: '#4E8A0C' },
  { key: 'bodyFatPercent', label: '% жира', color: '#8FBB3A' },
];

interface Props {
  measurements: MeasurementEntry[];
}

export const MeasurementChart: React.FC<Props> = ({ measurements }) => {
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['waist']);

  const data = measurements.slice(-10).map(m => ({
    date: m.date.slice(5), // MM-DD
    ...m,
  }));

  const toggleMetric = (key: string) => {
    setActiveMetrics(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {CHART_METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => toggleMetric(m.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeMetrics.includes(m.key)
                ? 'text-white shadow-sm'
                : 'bg-cream/60 text-gray-500 hover:bg-cream'
            }`}
            style={activeMetrics.includes(m.key) ? { backgroundColor: m.color } : undefined}
          >
            {m.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
          {CHART_METRICS.filter(m => activeMetrics.includes(m.key)).map(m => (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              stroke={m.color}
              strokeWidth={2}
              dot={{ fill: m.color, r: 3 }}
              name={m.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

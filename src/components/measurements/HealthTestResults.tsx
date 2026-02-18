import React, { useMemo } from 'react';
import { Card } from '../ui/Card';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { HealthTestResult } from '../../types';
import { HEALTH_TESTS } from '../../data/healthTests';

interface Props {
  results: HealthTestResult[];
}

export const HealthTestResults: React.FC<Props> = ({ results }) => {
  const radarData = useMemo(() => {
    return HEALTH_TESTS.map(test => {
      const lastResult = [...results].reverse().find(r => r.testType === test.type);
      return {
        system: test.title.split(' ')[0],
        score: lastResult?.score || 0,
        fullMark: 100,
      };
    }).filter(d => d.score > 0);
  }, [results]);

  if (radarData.length < 2) return null;

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Общая картина здоровья</p>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#E5D8CC" />
          <PolarAngleAxis dataKey="system" tick={{ fontSize: 10, fill: '#6B7280' }} />
          <Radar
            name="Здоровье"
            dataKey="score"
            stroke="#4E8A0C"
            fill="#4E8A0C"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

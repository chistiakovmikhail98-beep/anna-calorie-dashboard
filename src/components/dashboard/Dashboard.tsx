import React from 'react';
import { useUser } from '../../context/UserContext';
import { CalorieRings } from './CalorieRings';
import { QuickStats } from './QuickStats';
import { WeightMiniChart } from './WeightMiniChart';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const { profile, calculations, setCurrentPage } = useUser();

  if (!profile || !calculations) {
    return (
      <div className="text-center py-20 animate-fade-up">
        <h3 className="font-serif text-3xl text-raspberry mb-4">Добро пожаловать!</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Для начала рассчитайте вашу дневную норму калорий в калькуляторе
        </p>
        <Button onClick={() => setCurrentPage('calculator')}>
          Перейти к калькулятору
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <CalorieRings />
      <QuickStats />
      <WeightMiniChart />
    </div>
  );
};

import React from 'react';
import { Card } from '../ui/Card';
import { CalculationResult } from '../../types';
import { Flame, Droplets, Scale, Target, Beef, Egg, Wheat } from 'lucide-react';

interface Props {
  results: CalculationResult;
}

export const ResultsDisplay: React.FC<Props> = ({ results }) => {
  const macroTotal = results.protein + results.fat + results.carbs;
  const proteinPct = macroTotal > 0 ? Math.round((results.protein / macroTotal) * 100) : 0;
  const fatPct = macroTotal > 0 ? Math.round((results.fat / macroTotal) * 100) : 0;
  const carbsPct = 100 - proteinPct - fatPct;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Main calories */}
      <Card className="p-8 text-center bg-gradient-to-br from-white to-powder-light">
        <p className="text-xs uppercase tracking-[0.3em] text-olive font-medium mb-3">Ваша дневная норма</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-serif text-6xl md:text-7xl text-raspberry">{results.targetCalories}</span>
          <span className="text-gray-400 text-lg">ккал</span>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
          <span>BMR: {results.bmr} ккал</span>
          <span className="w-1 h-1 bg-powder rounded-full" />
          <span>TDEE: {results.tdee} ккал</span>
        </div>
      </Card>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5 text-center">
          <Beef size={20} className="mx-auto text-raspberry mb-2" />
          <p className="font-serif text-2xl text-raspberry">{results.protein}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Белки (г)</p>
          <div className="w-full bg-cream rounded-full h-1.5 mt-3">
            <div className="bg-raspberry h-1.5 rounded-full transition-all duration-1000" style={{ width: `${proteinPct}%` }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{proteinPct}%</p>
        </Card>

        <Card className="p-5 text-center">
          <Egg size={20} className="mx-auto text-olive mb-2" />
          <p className="font-serif text-2xl text-olive">{results.fat}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Жиры (г)</p>
          <div className="w-full bg-cream rounded-full h-1.5 mt-3">
            <div className="bg-olive h-1.5 rounded-full transition-all duration-1000" style={{ width: `${fatPct}%` }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{fatPct}%</p>
        </Card>

        <Card className="p-5 text-center">
          <Wheat size={20} className="mx-auto text-cream-dark mb-2" />
          <p className="font-serif text-2xl text-cream-dark">{results.carbs}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Углеводы (г)</p>
          <div className="w-full bg-cream rounded-full h-1.5 mt-3">
            <div className="bg-cream-dark h-1.5 rounded-full transition-all duration-1000" style={{ width: `${carbsPct}%` }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{carbsPct}%</p>
        </Card>
      </div>

      {/* Additional metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Scale size={18} className="mx-auto text-olive mb-2" />
          <p className="font-serif text-xl text-gray-800">{results.bmi}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">BMI</p>
          <p className="text-xs text-olive mt-1">{results.bmiCategory}</p>
        </Card>

        <Card className="p-4 text-center">
          <Target size={18} className="mx-auto text-raspberry mb-2" />
          <p className="font-serif text-xl text-gray-800">{results.idealWeight} кг</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Идеальный вес</p>
        </Card>

        <Card className="p-4 text-center">
          <Droplets size={18} className="mx-auto text-blue-400 mb-2" />
          <p className="font-serif text-xl text-gray-800">{(results.waterMl / 1000).toFixed(1)} л</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Норма воды</p>
        </Card>

        <Card className="p-4 text-center">
          <Flame size={18} className="mx-auto text-bright-pink mb-2" />
          <p className="font-serif text-xl text-gray-800">{results.bmr}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Базовый обмен</p>
        </Card>
      </div>
    </div>
  );
};

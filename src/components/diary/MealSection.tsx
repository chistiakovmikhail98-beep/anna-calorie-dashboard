import React from 'react';
import { Card } from '../ui/Card';
import { MealEntry } from '../../types';
import { Plus, X, Sparkles } from 'lucide-react';

interface Props {
  meal: string;
  label: string;
  entries: MealEntry[];
  onAdd: () => void;
  onAi: () => void;
  onRemove: (id: string) => void;
}

export const MealSection: React.FC<Props> = ({ label, entries, onAdd, onAi, onRemove }) => {
  const totalCal = entries.reduce((s, e) => s + e.calories, 0);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-medium text-gray-800">{label}</h4>
          <p className="text-xs text-gray-400">{totalCal} ккал</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAi}
            className="w-9 h-9 rounded-full bg-olive/10 flex items-center justify-center hover:bg-olive hover:text-white text-olive transition-all"
            title="ИИ-распознавание"
          >
            <Sparkles size={16} />
          </button>
          <button
            onClick={onAdd}
            className="w-9 h-9 rounded-full bg-cream flex items-center justify-center hover:bg-raspberry hover:text-white text-raspberry transition-all"
            title="Из базы продуктов"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {entries.length > 0 ? (
        <div className="space-y-2">
          {entries.map(entry => (
            <div key={entry.id} className="flex items-center justify-between py-2 border-b border-cream last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{entry.foodName}</p>
                <p className="text-[10px] text-gray-400">{entry.grams}г · Б{entry.protein} Ж{entry.fat} У{entry.carbs}</p>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <span className="text-sm font-medium text-raspberry">{entry.calories}</span>
                <button onClick={() => onRemove(entry.id)} className="text-gray-300 hover:text-raspberry transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-300 text-center py-2">Пока пусто</p>
      )}
    </Card>
  );
};

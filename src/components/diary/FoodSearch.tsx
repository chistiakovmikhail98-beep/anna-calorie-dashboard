import React, { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FoodItem } from '../../types';
import { Search, X } from 'lucide-react';
import { FOODS, FOOD_CATEGORIES } from '../../data/foods';

interface Props {
  onSelect: (food: FoodItem, grams: number) => void;
  onClose: () => void;
}

export const FoodSearch: React.FC<Props> = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState(100);

  const filtered = useMemo(() => {
    let items = FOODS;
    if (category) items = items.filter(f => f.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(f => f.name.toLowerCase().includes(q));
    }
    return items.slice(0, 50);
  }, [query, category]);

  const handleAdd = () => {
    if (selected && grams > 0) {
      onSelect(selected, grams);
    }
  };

  return (
    <Card className="p-5 mt-2 border-2 border-powder">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-sm font-medium text-gray-700">Добавить продукт</h5>
        <button onClick={onClose} className="text-gray-400 hover:text-raspberry transition-colors">
          <X size={18} />
        </button>
      </div>

      {!selected ? (
        <>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск продукта..."
              className="w-full bg-cream/50 border border-powder rounded-2xl py-2.5 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:border-raspberry"
              autoFocus
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <button
              onClick={() => setCategory('')}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all ${
                !category ? 'bg-raspberry text-white' : 'bg-cream text-gray-500 hover:bg-cream-dark/30'
              }`}
            >
              Все
            </button>
            {FOOD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider transition-all ${
                  category === cat ? 'bg-raspberry text-white' : 'bg-cream text-gray-500 hover:bg-cream-dark/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filtered.map(food => (
              <button
                key={food.id}
                onClick={() => setSelected(food)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-cream transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-700">{food.name}</p>
                  <p className="text-[10px] text-gray-400">Б{food.protein} Ж{food.fat} У{food.carbs} на 100г</p>
                </div>
                <span className="text-sm font-medium text-raspberry">{food.calories}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">Ничего не найдено</p>
            )}
          </div>
        </>
      ) : (
        /* Selected food — set grams */
        <div className="space-y-4">
          <div className="bg-cream rounded-2xl p-4">
            <p className="font-medium text-gray-800">{selected.name}</p>
            <p className="text-xs text-gray-400 mt-1">
              {selected.calories} ккал · Б{selected.protein} Ж{selected.fat} У{selected.carbs} на 100г
            </p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-olive font-medium mb-2 block">Количество (г)</label>
            <input
              type="number"
              value={grams}
              onChange={e => setGrams(Math.max(1, +e.target.value))}
              min={1}
              className="w-full bg-cream/50 border border-powder rounded-2xl py-3 px-5 text-gray-700 focus:outline-none focus:border-raspberry text-sm"
              autoFocus
            />
          </div>

          <div className="bg-powder-light rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif text-raspberry">{Math.round((selected.calories * grams) / 100)} ккал</p>
            <p className="text-xs text-gray-400 mt-1">
              Б{((selected.protein * grams) / 100).toFixed(1)} · Ж{((selected.fat * grams) / 100).toFixed(1)} · У{((selected.carbs * grams) / 100).toFixed(1)}
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setSelected(null)} className="flex-1 py-3 rounded-2xl bg-cream text-gray-500 text-sm font-medium hover:bg-cream-dark/30 transition-colors">
              Назад
            </button>
            <Button onClick={handleAdd} className="flex-1">
              Добавить
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

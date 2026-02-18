import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { saveWellnessEntry } from '../../utils/storage';
import { WellnessEntry, WellnessRating } from '../../types';
import { Check } from 'lucide-react';

const METRICS = [
  { key: 'mood', label: 'Настроение', emojis: ['😞', '😕', '😐', '🙂', '😊'] },
  { key: 'energy', label: 'Энергия', emojis: ['🔋', '🪫', '⚡', '💪', '🚀'] },
  { key: 'sleep', label: 'Сон', emojis: ['😴', '🥱', '😑', '😌', '💤'] },
  { key: 'digestion', label: 'Пищеварение', emojis: ['😣', '😖', '😐', '😊', '✨'] },
  { key: 'skin', label: 'Кожа', emojis: ['😟', '🤔', '😐', '😊', '✨'] },
  { key: 'stress', label: 'Стресс', emojis: ['😰', '😥', '😐', '😌', '🧘'] },
] as const;

const SYMPTOM_TAGS = [
  'Вздутие', 'Головная боль', 'Усталость', 'Тошнота',
  'Изжога', 'Запор', 'Высыпания', 'Бессонница',
  'Тяга к сладкому', 'Отёки', 'Раздражительность',
];

interface Props {
  existing: WellnessEntry | null;
  onSave: () => void;
}

export const WellnessCheckIn: React.FC<Props> = ({ existing, onSave }) => {
  const today = new Date().toISOString().split('T')[0];

  const [ratings, setRatings] = useState<Record<string, WellnessRating>>({
    mood: existing?.mood || 0 as WellnessRating,
    energy: existing?.energy || 0 as WellnessRating,
    sleep: existing?.sleep || 0 as WellnessRating,
    digestion: existing?.digestion || 0 as WellnessRating,
    skin: existing?.skin || 0 as WellnessRating,
    stress: existing?.stress || 0 as WellnessRating,
  });

  const [note, setNote] = useState(existing?.note || '');
  const [symptoms, setSymptoms] = useState<string[]>(existing?.symptoms || []);
  const [saved, setSaved] = useState(!!existing);

  const setRating = (key: string, value: WellnessRating) => {
    setRatings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const toggleSymptom = (s: string) => {
    setSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
    setSaved(false);
  };

  const allFilled = Object.values(ratings).every(v => v > 0);

  const handleSave = () => {
    if (!allFilled) return;
    const entry: WellnessEntry = {
      date: today,
      mood: ratings.mood,
      energy: ratings.energy,
      sleep: ratings.sleep,
      digestion: ratings.digestion,
      skin: ratings.skin,
      stress: ratings.stress,
      note: note || undefined,
      symptoms: symptoms.length > 0 ? symptoms : undefined,
    };
    saveWellnessEntry(entry);
    setSaved(true);
    onSave();
  };

  return (
    <Card className={saved ? 'border-2 border-olive/30' : ''}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">
          {saved ? 'Сегодня записано' : 'Как вы сегодня?'}
        </p>
        {saved && <Check size={18} className="text-olive" />}
      </div>

      <div className="space-y-4">
        {METRICS.map(({ key, label, emojis }) => (
          <div key={key}>
            <p className="text-sm text-gray-600 mb-2">{label}</p>
            <div className="flex gap-2">
              {emojis.map((emoji, i) => {
                const value = (i + 1) as WellnessRating;
                const isSelected = ratings[key] === value;
                return (
                  <button
                    key={i}
                    onClick={() => setRating(key, value)}
                    className={`w-11 h-11 rounded-xl text-lg flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-raspberry/10 scale-110 ring-2 ring-raspberry/30'
                        : 'bg-cream/60 hover:bg-cream hover:scale-105'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Symptoms */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">Симптомы (если есть)</p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleSymptom(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                symptoms.includes(tag)
                  ? 'bg-raspberry/10 text-raspberry border border-raspberry/30'
                  : 'bg-cream/60 text-gray-500 border border-transparent hover:bg-cream'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-5">
        <p className="text-sm text-gray-600 mb-2">Заметка</p>
        <textarea
          value={note}
          onChange={e => { setNote(e.target.value); setSaved(false); }}
          placeholder="Как себя чувствуете? Что заметили?"
          className="w-full bg-cream/50 border border-powder rounded-2xl py-3 px-4 text-gray-700 text-sm resize-none h-20 focus:outline-none focus:border-raspberry transition-colors"
        />
      </div>

      {!saved && (
        <div className="mt-5">
          <Button onClick={handleSave} disabled={!allFilled} className="w-full">
            Сохранить
          </Button>
        </div>
      )}
    </Card>
  );
};

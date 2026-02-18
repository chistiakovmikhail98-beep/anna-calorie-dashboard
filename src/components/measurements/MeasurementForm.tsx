import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { addMeasurement } from '../../utils/storage';
import { MeasurementEntry } from '../../types';

const FIELDS: { key: keyof MeasurementEntry; label: string; unit: string; group: string }[] = [
  { key: 'waist', label: 'Талия', unit: 'см', group: 'Обхваты' },
  { key: 'hips', label: 'Бёдра', unit: 'см', group: 'Обхваты' },
  { key: 'chest', label: 'Грудь', unit: 'см', group: 'Обхваты' },
  { key: 'bicepLeft', label: 'Бицепс (Л)', unit: 'см', group: 'Обхваты' },
  { key: 'bicepRight', label: 'Бицепс (П)', unit: 'см', group: 'Обхваты' },
  { key: 'thighLeft', label: 'Бедро (Л)', unit: 'см', group: 'Обхваты' },
  { key: 'thighRight', label: 'Бедро (П)', unit: 'см', group: 'Обхваты' },
  { key: 'neck', label: 'Шея', unit: 'см', group: 'Обхваты' },
  { key: 'bodyFatPercent', label: '% жира', unit: '%', group: 'Состав тела' },
  { key: 'muscleMassKg', label: 'Мышечная масса', unit: 'кг', group: 'Состав тела' },
  { key: 'bloodPressureSystolic', label: 'Давление верх', unit: 'мм', group: 'Показатели' },
  { key: 'bloodPressureDiastolic', label: 'Давление низ', unit: 'мм', group: 'Показатели' },
  { key: 'restingHeartRate', label: 'Пульс покоя', unit: 'уд/м', group: 'Показатели' },
];

interface Props {
  onSave: () => void;
}

export const MeasurementForm: React.FC<Props> = ({ onSave }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    const entry: MeasurementEntry = {
      date: new Date().toISOString().split('T')[0],
    };

    FIELDS.forEach(f => {
      const val = parseFloat(values[f.key] || '');
      if (!isNaN(val) && val > 0) {
        (entry as Record<string, unknown>)[f.key] = val;
      }
    });

    const hasValues = Object.keys(entry).length > 1;
    if (!hasValues) return;

    addMeasurement(entry);
    setValues({});
    setIsOpen(false);
    onSave();
  };

  const groups = [...new Set(FIELDS.map(f => f.group))];

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full">
        Новый замер
      </Button>
    );
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-5">Новый замер</p>

      {groups.map(group => (
        <div key={group} className="mb-5">
          <p className="text-sm font-medium text-gray-600 mb-3">{group}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FIELDS.filter(f => f.group === group).map(field => (
              <div key={field.key}>
                <label className="text-xs text-gray-400 mb-1 block">{field.label}</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={values[field.key] || ''}
                    onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder="—"
                    className="w-full bg-cream/50 border border-powder rounded-xl py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:border-raspberry transition-colors pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{field.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-5">
        <Button variant="secondary" onClick={() => setIsOpen(false)} className="flex-1">
          Отмена
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Сохранить
        </Button>
      </div>
    </Card>
  );
};

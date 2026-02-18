import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { MeasurementForm } from './MeasurementForm';
import { MeasurementChart } from './MeasurementChart';
import { ProgressPhotos } from './ProgressPhotos';
import { HealthTest } from './HealthTest';
import { HealthTestResults } from './HealthTestResults';
import { loadMeasurements, loadHealthTests } from '../../utils/storage';
import { MeasurementEntry, HealthTestResult } from '../../types';
import { HEALTH_TESTS } from '../../data/healthTests';

type Tab = 'measurements' | 'tests';

export const MeasurementsPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('measurements');
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>([]);
  const [testResults, setTestResults] = useState<HealthTestResult[]>([]);
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const reload = () => {
    setMeasurements(loadMeasurements());
    setTestResults(loadHealthTests());
  };

  useEffect(reload, []);

  const activeTestData = HEALTH_TESTS.find(t => t.type === activeTest);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Замеры и <span className="italic">тесты</span>
        </h3>
        <p className="text-gray-500 text-sm">Отслеживайте параметры тела и здоровье</p>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2">
        <button
          onClick={() => { setTab('measurements'); setActiveTest(null); }}
          className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
            tab === 'measurements'
              ? 'bg-raspberry text-white shadow-md'
              : 'bg-cream/60 text-gray-600 hover:bg-cream'
          }`}
        >
          Замеры тела
        </button>
        <button
          onClick={() => { setTab('tests'); setActiveTest(null); }}
          className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
            tab === 'tests'
              ? 'bg-raspberry text-white shadow-md'
              : 'bg-cream/60 text-gray-600 hover:bg-cream'
          }`}
        >
          Тесты здоровья
        </button>
      </div>

      {tab === 'measurements' && (
        <>
          <MeasurementForm onSave={reload} />
          <ProgressPhotos />
          {measurements.length > 1 && (
            <Card>
              <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">Динамика</p>
              <MeasurementChart measurements={measurements} />
            </Card>
          )}
          {measurements.length > 0 && (
            <Card>
              <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">
                Последний замер — {measurements[measurements.length - 1].date}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Талия', value: measurements[measurements.length - 1].waist, unit: 'см' },
                  { label: 'Бёдра', value: measurements[measurements.length - 1].hips, unit: 'см' },
                  { label: 'Грудь', value: measurements[measurements.length - 1].chest, unit: 'см' },
                  { label: 'Бицепс Л', value: measurements[measurements.length - 1].bicepLeft, unit: 'см' },
                  { label: 'Бицепс П', value: measurements[measurements.length - 1].bicepRight, unit: 'см' },
                  { label: 'Бедро Л', value: measurements[measurements.length - 1].thighLeft, unit: 'см' },
                  { label: 'Бедро П', value: measurements[measurements.length - 1].thighRight, unit: 'см' },
                  { label: 'Шея', value: measurements[measurements.length - 1].neck, unit: 'см' },
                  { label: '% жира', value: measurements[measurements.length - 1].bodyFatPercent, unit: '%' },
                ].filter(item => item.value != null).map(item => (
                  <div key={item.label} className="bg-cream/40 rounded-2xl p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400">{item.label}</p>
                    <p className="font-serif text-xl text-raspberry mt-1">{item.value} <span className="text-xs text-gray-400">{item.unit}</span></p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {tab === 'tests' && !activeTest && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HEALTH_TESTS.map(test => {
              const lastResult = [...testResults].reverse().find(r => r.testType === test.type);
              const scoring = lastResult
                ? test.scoring.find(s => lastResult.score >= s.min && lastResult.score <= s.max)
                : null;
              return (
                <Card
                  key={test.type}
                  className="cursor-pointer hover:border-raspberry/30 hover:shadow-md"
                >
                  <button onClick={() => setActiveTest(test.type)} className="w-full text-left">
                    <p className="font-medium text-gray-700 mb-1">{test.title}</p>
                    <p className="text-xs text-gray-400 mb-3">{test.description}</p>
                    {lastResult ? (
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          lastResult.score >= 76 ? 'bg-olive/10 text-olive' :
                          lastResult.score >= 51 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-raspberry/10 text-raspberry'
                        }`}>
                          {scoring?.level}
                        </span>
                        <span className="font-serif text-lg text-raspberry">{lastResult.score}%</span>
                      </div>
                    ) : (
                      <p className="text-xs text-raspberry font-medium">Пройти тест →</p>
                    )}
                  </button>
                </Card>
              );
            })}
          </div>

          {testResults.length > 0 && (
            <HealthTestResults results={testResults} />
          )}
        </>
      )}

      {tab === 'tests' && activeTestData && (
        <HealthTest
          test={activeTestData}
          onComplete={() => { setActiveTest(null); reload(); }}
          onCancel={() => setActiveTest(null)}
        />
      )}
    </div>
  );
};

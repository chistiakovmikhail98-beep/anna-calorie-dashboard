import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { saveHealthTest } from '../../utils/storage';
import { HealthTestResult } from '../../types';
import { HealthTest as HealthTestData } from '../../data/healthTests';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Props {
  test: HealthTestData;
  onComplete: () => void;
  onCancel: () => void;
}

export const HealthTest: React.FC<Props> = ({ test, onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const question = test.questions[step];
  const totalQuestions = test.questions.length;
  const progress = ((step + 1) / totalQuestions) * 100;
  const allAnswered = Object.keys(answers).length === totalQuestions;

  const rawScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxScore = totalQuestions * 5;
  const score = Math.round((rawScore / maxScore) * 100);
  const scoring = test.scoring.find(s => score >= s.min && score <= s.max);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    if (step < totalQuestions - 1) {
      setTimeout(() => setStep(step + 1), 200);
    }
  };

  const handleFinish = () => {
    const result: HealthTestResult = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      testType: test.type,
      score,
      answers,
    };
    saveHealthTest(result);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <Card className="text-center">
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
          score >= 76 ? 'bg-olive/10' : score >= 51 ? 'bg-yellow-100' : 'bg-raspberry/10'
        }`}>
          <span className="font-serif text-3xl text-raspberry">{score}%</span>
        </div>
        <h4 className="font-serif text-2xl text-raspberry mb-2">{scoring?.level}</h4>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">{scoring?.description}</p>
        <Button onClick={onComplete}>Готово</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Назад
        </button>
        <span className="text-xs text-gray-400">{step + 1} / {totalQuestions}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden">
        <div
          className="h-full bg-raspberry rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-4">{test.title}</p>
        <p className="text-gray-700 font-medium mb-6">{question.text}</p>

        <div className="space-y-2">
          {question.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all ${
                answers[question.id] === opt.value
                  ? 'bg-raspberry/10 text-raspberry border-2 border-raspberry/30'
                  : 'bg-cream/40 text-gray-600 border-2 border-transparent hover:bg-cream'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">
            <ArrowLeft size={16} className="mr-1" /> Назад
          </Button>
        )}
        {step < totalQuestions - 1 && answers[question.id] != null && (
          <Button onClick={() => setStep(step + 1)} className="flex-1">
            Далее <ArrowRight size={16} className="ml-1" />
          </Button>
        )}
        {allAnswered && step === totalQuestions - 1 && (
          <Button onClick={handleFinish} className="flex-1">
            <Check size={16} className="mr-1" /> Завершить
          </Button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { UserInputForm } from './UserInputForm';
import { ResultsDisplay } from './ResultsDisplay';
import { UserProfile } from '../../types';

export const Calculator: React.FC = () => {
  const { profile, setProfile, calculations } = useUser();
  const [showResults, setShowResults] = useState(!!profile);

  const handleSubmit = (data: UserProfile) => {
    setProfile(data);
    setShowResults(true);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Калькулятор <span className="italic font-light">калорий</span>
        </h3>
        <p className="text-gray-400 text-sm">Рассчитайте вашу дневную норму на основе научных формул</p>
      </div>

      <UserInputForm onSubmit={handleSubmit} initialData={profile} />

      {showResults && calculations && (
        <ResultsDisplay results={calculations} />
      )}
    </div>
  );
};

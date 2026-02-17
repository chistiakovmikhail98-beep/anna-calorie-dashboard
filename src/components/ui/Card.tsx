import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white hover:shadow-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

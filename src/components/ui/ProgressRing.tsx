import React from 'react';

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label: string;
  unit?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = '#D4213D',
  bgColor = '#EFBFBA',
  label,
  unit = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-gray-800">{Math.round(value)}</span>
          {unit && <span className="text-[10px] text-gray-400 uppercase tracking-wider">{unit}</span>}
        </div>
      </div>
      <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
};

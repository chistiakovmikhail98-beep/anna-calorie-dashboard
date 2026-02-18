import React from 'react';
import { useUser } from '../../context/UserContext';
import { Flame, User } from 'lucide-react';
import { getStreak, loadAvatar } from '../../utils/storage';

export const Header: React.FC = () => {
  const { profile } = useUser();
  const streak = getStreak();
  const avatar = loadAvatar();

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {/* Mobile avatar */}
        <div className="lg:hidden w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-powder" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-powder to-cream flex items-center justify-center border border-powder">
              <User size={18} className="text-raspberry/40" />
            </div>
          )}
        </div>
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-raspberry">
            {profile ? `Привет, ${profile.name}` : 'Добро пожаловать'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>
      {streak.current > 0 && (
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-powder/50">
          <Flame size={18} className="text-raspberry" />
          <span className="text-sm font-semibold text-raspberry">{streak.current}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">дней</span>
        </div>
      )}
    </header>
  );
};

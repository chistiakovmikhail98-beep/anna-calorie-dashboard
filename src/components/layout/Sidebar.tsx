import React from 'react';
import { LayoutDashboard, Calculator, BookOpen, TrendingUp, User } from 'lucide-react';
import { Page } from '../../types';
import { useUser } from '../../context/UserContext';

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { page: 'calculator', label: 'Калькулятор', icon: Calculator },
  { page: 'diary', label: 'Дневник', icon: BookOpen },
  { page: 'progress', label: 'Прогресс', icon: TrendingUp },
  { page: 'profile', label: 'Профиль', icon: User },
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useUser();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white/80 backdrop-blur-md border-r border-cream-dark/30 p-6 fixed left-0 top-0 z-40">
        <div className="mb-12">
          <h1 className="font-serif text-2xl text-raspberry italic">Anna</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-olive font-medium mt-1">Anti-Age & Wellness</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 text-left ${
                currentPage === page
                  ? 'bg-raspberry text-white shadow-md'
                  : 'text-gray-600 hover:bg-cream hover:text-raspberry'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-cream-dark/30">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 text-center">
            Личный кабинет
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-cream-dark/30 z-50 px-2 py-2">
        <div className="flex justify-around items-center">
          {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                currentPage === page
                  ? 'text-raspberry'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-medium tracking-wide">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

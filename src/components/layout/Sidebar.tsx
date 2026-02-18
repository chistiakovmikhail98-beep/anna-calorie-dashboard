import React, { useState, useRef } from 'react';
import {
  LayoutDashboard, UtensilsCrossed, Heart, Activity, Ruler,
  TrendingUp, BookOpen, Calculator, User, MoreHorizontal, X, Camera
} from 'lucide-react';
import { Page } from '../../types';
import { useUser } from '../../context/UserContext';
import { loadAvatar, saveAvatar } from '../../utils/storage';
import { resizeImage } from '../../utils/imageResize';

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { page: 'diary', label: 'Питание', icon: UtensilsCrossed },
  { page: 'wellness', label: 'Самочувствие', icon: Heart },
  { page: 'activity', label: 'Активность', icon: Activity },
  { page: 'measurements', label: 'Замеры', icon: Ruler },
  { page: 'progress', label: 'Прогресс', icon: TrendingUp },
  { page: 'library', label: 'Библиотека', icon: BookOpen },
  { page: 'calculator', label: 'Калькулятор', icon: Calculator },
  { page: 'profile', label: 'Профиль', icon: User },
];

const MOBILE_NAV: { page: Page | 'more'; label: string; icon: React.ElementType }[] = [
  { page: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { page: 'diary', label: 'Питание', icon: UtensilsCrossed },
  { page: 'wellness', label: 'Здоровье', icon: Heart },
  { page: 'progress', label: 'Прогресс', icon: TrendingUp },
  { page: 'more', label: 'Ещё', icon: MoreHorizontal },
];

const MORE_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: 'activity', label: 'Активность', icon: Activity },
  { page: 'measurements', label: 'Замеры', icon: Ruler },
  { page: 'library', label: 'Библиотека', icon: BookOpen },
  { page: 'calculator', label: 'Калькулятор', icon: Calculator },
  { page: 'profile', label: 'Профиль', icon: User },
];

export const Sidebar: React.FC = () => {
  const { profile, currentPage, setCurrentPage } = useUser();
  const [moreOpen, setMoreOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(loadAvatar);
  const fileRef = useRef<HTMLInputElement>(null);

  const isMoreActive = MORE_ITEMS.some(item => item.page === currentPage);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImage(file, 200, 0.8);
    saveAvatar(dataUrl);
    setAvatar(dataUrl);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white/80 backdrop-blur-md border-r border-cream-dark/30 p-6 fixed left-0 top-0 z-40">
        {/* Avatar + title */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className="relative w-20 h-20 rounded-full mb-3 cursor-pointer group"
            onClick={() => fileRef.current?.click()}
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-powder" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-powder to-cream flex items-center justify-center border-2 border-powder">
                <User size={32} className="text-raspberry/40" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
          <h1 className="font-serif text-lg text-raspberry italic text-center">
            {profile?.name || 'Личный кабинет'}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-olive font-medium mt-0.5">Anna Sennitskaya</p>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 text-left ${
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
            Anna Sennitskaya Nutrition
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-cream-dark/30 z-50 px-2 py-2">
        <div className="flex justify-around items-center">
          {MOBILE_NAV.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => {
                if (page === 'more') {
                  setMoreOpen(!moreOpen);
                } else {
                  setCurrentPage(page);
                  setMoreOpen(false);
                }
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                page === 'more'
                  ? (moreOpen || isMoreActive ? 'text-raspberry' : 'text-gray-400 hover:text-gray-600')
                  : currentPage === page
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

      {/* Mobile "more" sheet */}
      {moreOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-50"
            onClick={() => setMoreOpen(false)}
          />
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 pb-24 animate-fade-up">
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Ещё</p>
              <button onClick={() => setMoreOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 px-4 pb-4">
              {MORE_ITEMS.map(({ page, label, icon: Icon }) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setMoreOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${
                    currentPage === page
                      ? 'bg-raspberry/10 text-raspberry'
                      : 'text-gray-600 hover:bg-cream'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

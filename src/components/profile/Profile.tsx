import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserProfile, Gender, ActivityLevel, Goal } from '../../types';
import { CheckCircle, MessageCircle, Link2, Unlink, ExternalLink } from 'lucide-react';

const BOT_USERNAME = 'AnnaDietBot';

export const Profile: React.FC = () => {
  const { profile, setProfile, calculations, setCurrentPage } = useUser();
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(profile?.name || '');
  const [gender, setGender] = useState<Gender>(profile?.gender || 'female');
  const [age, setAge] = useState(profile?.age || 35);
  const [height, setHeight] = useState(profile?.height || 165);
  const [weight, setWeight] = useState(profile?.weight || 70);
  const [goalWeight, setGoalWeight] = useState(profile?.goalWeight || 60);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile?.activityLevel || 'light');
  const [goal, setGoal] = useState<Goal>(profile?.goal || 'lose');
  const [tgUsername, setTgUsername] = useState(profile?.telegramUsername || '');
  const [tgConnected, setTgConnected] = useState(profile?.telegramConnected || false);

  if (!profile) {
    return (
      <div className="text-center py-20 animate-fade-up">
        <p className="text-gray-400 mb-4">Сначала заполните калькулятор</p>
        <Button onClick={() => setCurrentPage('calculator')}>К калькулятору</Button>
      </div>
    );
  }

  const inputClass = "w-full bg-cream/50 border border-powder rounded-2xl py-3 px-5 text-gray-700 focus:outline-none focus:border-raspberry text-sm";
  const labelClass = "text-xs uppercase tracking-[0.2em] text-olive font-medium mb-2 block";

  const handleSave = () => {
    const updated: UserProfile = {
      name, gender, age, height, weight, goalWeight, activityLevel, goal,
      telegramUsername: tgUsername || undefined,
      telegramConnected: tgConnected,
    };
    setProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTgConnect = () => {
    if (!tgUsername.trim()) return;
    setTgConnected(true);
    const cleanName = tgUsername.replace('@', '');
    setTgUsername(cleanName);

    const updated: UserProfile = {
      ...profile,
      telegramUsername: cleanName,
      telegramConnected: true,
    };
    setProfile(updated);
  };

  const handleTgDisconnect = () => {
    setTgConnected(false);
    setTgUsername('');

    const updated: UserProfile = {
      ...profile,
      telegramUsername: undefined,
      telegramConnected: false,
    };
    setProfile(updated);
  };

  const connectCode = profile.name
    ? Array.from(profile.name).reduce((s, c) => s + c.charCodeAt(0), 0).toString(36).toUpperCase().slice(0, 6) + Date.now().toString(36).slice(-2).toUpperCase()
    : 'ANNA2025';

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Мой <span className="italic font-light">профиль</span>
        </h3>
        <p className="text-gray-400 text-sm">Обновите данные для пересчёта нормы</p>
      </div>

      <Card className="p-8 space-y-5">
        <div>
          <label className={labelClass}>Имя</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
        </div>

        <div className="flex gap-3">
          {(['female', 'male'] as Gender[]).map(g => (
            <button key={g} type="button" onClick={() => setGender(g)}
              className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all ${
                gender === g ? 'bg-raspberry text-white' : 'bg-cream text-gray-600'
              }`}
            >
              {g === 'female' ? 'Женский' : 'Мужской'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Возраст</label>
            <input type="number" value={age} onChange={e => setAge(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Рост (см)</label>
            <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Вес (кг)</label>
            <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} step={0.1} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Желаемый вес (кг)</label>
          <input type="number" value={goalWeight} onChange={e => setGoalWeight(+e.target.value)} step={0.1} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Активность</label>
          <select value={activityLevel} onChange={e => setActivityLevel(e.target.value as ActivityLevel)} className={inputClass}>
            <option value="sedentary">Сидячий</option>
            <option value="light">Лёгкая (1-3 р/нед)</option>
            <option value="moderate">Средняя (3-5 р/нед)</option>
            <option value="active">Высокая (6-7 р/нед)</option>
            <option value="extra">Экстра</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Цель</label>
          <select value={goal} onChange={e => setGoal(e.target.value as Goal)} className={inputClass}>
            <option value="lose">Похудение (−500 ккал)</option>
            <option value="mild_lose">Мягкое похудение (−300 ккал)</option>
            <option value="maintain">Поддержание</option>
            <option value="gain">Набор массы (+400 ккал)</option>
          </select>
        </div>

        <Button onClick={handleSave} className="w-full">
          {saved ? (
            <span className="flex items-center gap-2"><CheckCircle size={16} /> Сохранено!</span>
          ) : (
            'Сохранить и пересчитать'
          )}
        </Button>
      </Card>

      {/* Telegram Bot Connection */}
      <Card className="p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
            <MessageCircle size={20} className="text-[#229ED9]" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Telegram-бот</h4>
            <p className="text-xs text-gray-400">Напоминания, отчёты и быстрый ввод еды</p>
          </div>
        </div>

        {tgConnected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-olive/5 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center">
                <Link2 size={16} className="text-olive" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">@{tgUsername}</p>
                <p className="text-[10px] text-olive">Подключён</p>
              </div>
              <button
                onClick={handleTgDisconnect}
                className="text-xs text-gray-400 hover:text-raspberry flex items-center gap-1 transition-colors"
              >
                <Unlink size={12} />
                Отвязать
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <p className="font-medium text-gray-600 text-sm">Бот умеет:</p>
              <div className="grid grid-cols-1 gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  Утренние напоминания о завтраке
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  Ежедневный отчёт по КБЖУ
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  Быстрый ввод еды голосом или фото
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  Напоминания о воде каждые 2 часа
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  Еженедельная сводка по весу
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-powder-light rounded-2xl p-5 space-y-3">
              <p className="text-sm text-gray-600 font-medium">Как подключить:</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-raspberry/10 text-raspberry flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">1</span>
                  <span>Откройте бот <span className="font-medium text-[#229ED9]">@{BOT_USERNAME}</span> в Telegram</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-raspberry/10 text-raspberry flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">2</span>
                  <span>Отправьте команду <span className="font-mono bg-cream px-1.5 py-0.5 rounded">/start {connectCode}</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-raspberry/10 text-raspberry flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">3</span>
                  <span>Введите ваш Telegram username ниже</span>
                </div>
              </div>
            </div>

            <a
              href={`https://t.me/${BOT_USERNAME}?start=${connectCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#229ED9] text-white text-sm font-medium hover:bg-[#1E8DC4] transition-colors"
            >
              <MessageCircle size={16} />
              Открыть @{BOT_USERNAME}
              <ExternalLink size={12} />
            </a>

            <div>
              <label className={labelClass}>Ваш Telegram username</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                  <input
                    type="text"
                    value={tgUsername}
                    onChange={e => setTgUsername(e.target.value.replace('@', ''))}
                    placeholder="username"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <Button
                  onClick={handleTgConnect}
                  disabled={!tgUsername.trim()}
                  className="px-6"
                >
                  <Link2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {calculations && (
        <Card className="p-6 text-center bg-powder-light/50">
          <p className="text-xs uppercase tracking-widest text-olive mb-2">Ваша норма</p>
          <p className="font-serif text-4xl text-raspberry">{calculations.targetCalories} ккал</p>
          <p className="text-xs text-gray-400 mt-2">
            Б{calculations.protein}г · Ж{calculations.fat}г · У{calculations.carbs}г
          </p>
        </Card>
      )}
    </div>
  );
};

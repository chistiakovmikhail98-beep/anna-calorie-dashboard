import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MealEntry } from '../../types';
import { parseFood, parseFoodImage } from '../../utils/gemini';
import { Sparkles, Loader2, X, Check, Camera, Mic, MicOff, ImageIcon } from 'lucide-react';

interface Props {
  onAdd: (entries: MealEntry[]) => void;
  onClose: () => void;
}

export const AiFood: React.FC<Props> = ({ onAdd, onClose }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('Анализирую...');
  const [error, setError] = useState('');
  const [results, setResults] = useState<MealEntry[] | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleParse = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setLoadingLabel('Анализирую текст...');
    setError('');
    setResults(null);

    try {
      const entries = await parseFood(text);
      setResults(entries);
    } catch (e: any) {
      setError(e.message || 'Ошибка распознавания');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);
    setLoadingLabel('Распознаю фото...');
    setError('');
    setResults(null);

    try {
      const entries = await parseFoodImage(file);
      setResults(entries);
    } catch (err: any) {
      setError(err.message || 'Ошибка распознавания фото');
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Голосовой ввод не поддерживается вашим браузером. Используйте Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setError('Нет доступа к микрофону. Разрешите в настройках браузера.');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setError('');
  };

  const handleConfirm = () => {
    if (results) {
      onAdd(results);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (results) {
      setResults(results.filter(r => r.id !== id));
    }
  };

  const handleReset = () => {
    setResults(null);
    setText('');
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Card className="p-6 border-2 border-olive/30 bg-gradient-to-br from-white to-cream">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-olive" />
          <h5 className="text-sm font-medium text-gray-700">ИИ-распознавание</h5>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-raspberry transition-colors">
          <X size={18} />
        </button>
      </div>

      {!results ? (
        <div className="space-y-4">
          {/* Photo preview */}
          {previewUrl && (
            <div className="relative rounded-2xl overflow-hidden">
              <img src={previewUrl} alt="Фото еды" className="w-full h-48 object-cover rounded-2xl" />
              {loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                  <Loader2 size={32} className="animate-spin text-white" />
                </div>
              )}
            </div>
          )}

          {/* Text input + voice */}
          <div className="relative">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Опишите что вы съели, например:&#10;&#10;Тарелка борща, 2 куска хлеба, чай с мёдом&#10;Или сфотографируйте еду / скажите голосом"
              rows={3}
              className="w-full bg-cream/50 border border-powder rounded-2xl py-3 px-5 pr-12 text-gray-700 focus:outline-none focus:border-olive text-sm resize-none"
              autoFocus
              disabled={loading}
            />
            <button
              onClick={handleVoice}
              disabled={loading}
              className={`absolute right-3 top-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-raspberry text-white animate-pulse'
                  : 'bg-cream text-gray-400 hover:text-olive hover:bg-olive/10'
              }`}
              title={isListening ? 'Остановить запись' : 'Голосовой ввод'}
            >
              {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          </div>

          {/* Action buttons row */}
          <div className="flex gap-2">
            {/* Photo button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhoto}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="flex items-center gap-2 py-3 px-4 rounded-2xl bg-cream text-gray-600 text-sm font-medium hover:bg-olive/10 hover:text-olive transition-all disabled:opacity-50"
            >
              <Camera size={16} />
              Фото
            </button>
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.removeAttribute('capture');
                  fileInputRef.current.click();
                  setTimeout(() => fileInputRef.current?.setAttribute('capture', 'environment'), 100);
                }
              }}
              disabled={loading}
              className="flex items-center gap-2 py-3 px-4 rounded-2xl bg-cream text-gray-600 text-sm font-medium hover:bg-olive/10 hover:text-olive transition-all disabled:opacity-50"
            >
              <ImageIcon size={16} />
              Галерея
            </button>
          </div>

          {error && (
            <p className="text-xs text-raspberry bg-powder-light rounded-xl px-4 py-2">{error}</p>
          )}

          {isListening && (
            <div className="flex items-center gap-2 text-xs text-olive bg-olive/5 rounded-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-raspberry animate-pulse" />
              Слушаю... Говорите что вы съели
            </div>
          )}

          <Button
            onClick={handleParse}
            disabled={loading || !text.trim()}
            variant="primary"
            className={`w-full ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {loadingLabel}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                Распознать продукты
              </span>
            )}
          </Button>

          <p className="text-[10px] text-gray-400 text-center">
            Powered by Gemini AI · Текст, фото или голос — ИИ разберёт
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-olive font-medium uppercase tracking-wider">Распознано {results.length} продуктов:</p>

          {previewUrl && (
            <img src={previewUrl} alt="Фото еды" className="w-full h-32 object-cover rounded-2xl opacity-60" />
          )}

          <div className="space-y-2">
            {results.map(entry => (
              <div key={entry.id} className="flex items-center justify-between py-3 px-4 bg-white rounded-2xl border border-cream">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{entry.foodName}</p>
                  <p className="text-[10px] text-gray-400">
                    {entry.grams}г · Б{entry.protein} Ж{entry.fat} У{entry.carbs}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-3">
                  <span className="text-sm font-semibold text-raspberry">{entry.calories} ккал</span>
                  <button onClick={() => handleRemoveItem(entry.id)} className="text-gray-300 hover:text-raspberry transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-powder-light rounded-2xl p-4 text-center">
            <p className="text-2xl font-serif text-raspberry">
              {results.reduce((s, r) => s + r.calories, 0)} ккал
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Б{results.reduce((s, r) => s + r.protein, 0).toFixed(1)} ·
              Ж{results.reduce((s, r) => s + r.fat, 0).toFixed(1)} ·
              У{results.reduce((s, r) => s + r.carbs, 0).toFixed(1)}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-2xl bg-cream text-gray-500 text-sm font-medium hover:bg-cream-dark/30 transition-colors"
            >
              Заново
            </button>
            <Button onClick={handleConfirm} className="flex-1" disabled={results.length === 0}>
              <span className="flex items-center gap-2">
                <Check size={16} />
                Добавить всё
              </span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

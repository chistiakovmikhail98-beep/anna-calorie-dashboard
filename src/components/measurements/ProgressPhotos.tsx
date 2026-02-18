import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { loadProgressPhotos, saveProgressPhoto, deleteProgressPhoto, ProgressPhoto } from '../../utils/storage';
import { resizeImage } from '../../utils/imageResize';
import { Camera, Trash2, ArrowLeftRight } from 'lucide-react';

export const ProgressPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedBefore, setSelectedBefore] = useState<ProgressPhoto | null>(null);
  const [selectedAfter, setSelectedAfter] = useState<ProgressPhoto | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhotos(loadProgressPhotos());
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await resizeImage(file, 800, 0.75);
    const today = new Date().toISOString().split('T')[0];

    const photo: ProgressPhoto = {
      id: Date.now().toString(),
      date: today,
      label: today,
      dataUrl,
    };

    saveProgressPhoto(photo);
    setPhotos(loadProgressPhotos());
    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    deleteProgressPhoto(id);
    const updated = loadProgressPhotos();
    setPhotos(updated);
    if (selectedBefore?.id === id) setSelectedBefore(null);
    if (selectedAfter?.id === id) setSelectedAfter(null);
  };

  const sorted = [...photos].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium">Фото прогресса</p>
          <div className="flex gap-2">
            {photos.length >= 2 && (
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  compareMode
                    ? 'bg-raspberry text-white'
                    : 'bg-cream/60 text-gray-600 hover:bg-cream'
                }`}
              >
                <ArrowLeftRight size={14} />
                До / После
              </button>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-raspberry/10 text-raspberry hover:bg-raspberry/20 transition-all"
            >
              <Camera size={14} />
              Загрузить
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        {photos.length === 0 && (
          <div className="text-center py-8">
            <Camera size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-400 mb-4">
              Загрузите фото для отслеживания визуального прогресса
            </p>
            <Button onClick={() => fileRef.current?.click()} variant="outline" className="!px-6 !py-2.5 !text-xs">
              Добавить фото
            </Button>
          </div>
        )}

        {/* Compare mode */}
        {compareMode && photos.length >= 2 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 text-center">ДО</p>
                {selectedBefore ? (
                  <div className="relative">
                    <img
                      src={selectedBefore.dataUrl}
                      alt="Before"
                      className="w-full rounded-2xl object-cover aspect-[3/4]"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {selectedBefore.date}
                    </span>
                  </div>
                ) : (
                  <div className="w-full rounded-2xl bg-cream/40 aspect-[3/4] flex items-center justify-center">
                    <p className="text-xs text-gray-400">Выберите фото ниже</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 text-center">ПОСЛЕ</p>
                {selectedAfter ? (
                  <div className="relative">
                    <img
                      src={selectedAfter.dataUrl}
                      alt="After"
                      className="w-full rounded-2xl object-cover aspect-[3/4]"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {selectedAfter.date}
                    </span>
                  </div>
                ) : (
                  <div className="w-full rounded-2xl bg-cream/40 aspect-[3/4] flex items-center justify-center">
                    <p className="text-xs text-gray-400">Выберите фото ниже</p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              Нажмите на фото ниже, чтобы выбрать для сравнения
            </p>
          </div>
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {sorted.map(photo => (
              <div key={photo.id} className="relative group">
                <button
                  onClick={() => {
                    if (compareMode) {
                      if (!selectedBefore || (selectedBefore && selectedAfter)) {
                        setSelectedBefore(photo);
                        setSelectedAfter(null);
                      } else {
                        setSelectedAfter(photo);
                      }
                    }
                  }}
                  className={`w-full block ${compareMode ? 'cursor-pointer' : ''}`}
                >
                  <img
                    src={photo.dataUrl}
                    alt={photo.date}
                    className={`w-full rounded-xl object-cover aspect-square transition-all ${
                      compareMode && (selectedBefore?.id === photo.id || selectedAfter?.id === photo.id)
                        ? 'ring-3 ring-raspberry'
                        : ''
                    }`}
                  />
                </button>
                <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  {photo.date.slice(5)}
                </span>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

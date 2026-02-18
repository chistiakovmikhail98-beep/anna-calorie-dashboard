import React, { useState, useEffect } from 'react';
import { LIBRARY_CONTENT } from '../../data/library';
import { ContentCard } from './ContentCard';
import { ContentViewer } from './ContentViewer';
import { loadContentProgress } from '../../utils/storage';
import { ContentCategory, ContentItem, ContentProgress } from '../../types';

const CATEGORIES: { key: ContentCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'nutrition', label: 'Питание' },
  { key: 'recipes', label: 'Рецепты' },
  { key: 'health', label: 'Здоровье' },
  { key: 'lifestyle', label: 'Образ жизни' },
];

export const Library: React.FC = () => {
  const [category, setCategory] = useState<ContentCategory | 'all'>('all');
  const [activeContent, setActiveContent] = useState<ContentItem | null>(null);
  const [progress, setProgress] = useState<Record<string, ContentProgress>>({});

  useEffect(() => {
    setProgress(loadContentProgress());
  }, []);

  const reload = () => setProgress(loadContentProgress());

  const filtered = category === 'all'
    ? LIBRARY_CONTENT
    : LIBRARY_CONTENT.filter(c => c.category === category);

  const featured = LIBRARY_CONTENT.filter(c => c.isFeatured);
  const completedCount = Object.values(progress).filter(p => p.completedAt).length;

  if (activeContent) {
    return (
      <ContentViewer
        content={activeContent}
        progress={progress[activeContent.id]}
        onBack={() => { setActiveContent(null); reload(); }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="font-serif text-3xl md:text-4xl text-raspberry mb-2">
          Библиотека <span className="italic">знаний</span>
        </h3>
        <p className="text-gray-500 text-sm">
          {completedCount} из {LIBRARY_CONTENT.length} материалов пройдено
        </p>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-3">Рекомендуемое</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {featured.map(item => (
              <div key={item.id} className="min-w-[240px] flex-shrink-0">
                <ContentCard
                  content={item}
                  progress={progress[item.id]}
                  onClick={() => setActiveContent(item)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === c.key
                ? 'bg-raspberry text-white'
                : 'bg-cream/60 text-gray-600 hover:bg-cream'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.sort((a, b) => a.order - b.order).map(item => (
          <ContentCard
            key={item.id}
            content={item}
            progress={progress[item.id]}
            onClick={() => setActiveContent(item)}
          />
        ))}
      </div>
    </div>
  );
};

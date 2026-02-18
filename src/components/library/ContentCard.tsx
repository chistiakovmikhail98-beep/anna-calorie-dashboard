import React from 'react';
import { Card } from '../ui/Card';
import { ContentItem, ContentProgress } from '../../types';
import { BookOpen, ChefHat, FileText, Bookmark, Check, Clock } from 'lucide-react';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  lesson: { icon: BookOpen, label: 'Урок', color: 'text-olive bg-olive/10' },
  recipe: { icon: ChefHat, label: 'Рецепт', color: 'text-raspberry bg-raspberry/10' },
  article: { icon: FileText, label: 'Статья', color: 'text-blue-600 bg-blue-50' },
  guide: { icon: BookOpen, label: 'Гайд', color: 'text-purple-600 bg-purple-50' },
};

interface Props {
  content: ContentItem;
  progress?: ContentProgress;
  onClick: () => void;
}

export const ContentCard: React.FC<Props> = ({ content, progress, onClick }) => {
  const config = TYPE_CONFIG[content.type] || TYPE_CONFIG.article;
  const Icon = config.icon;
  const isCompleted = !!progress?.completedAt;

  return (
    <Card className="cursor-pointer hover:border-raspberry/30 hover:shadow-md relative">
      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-start justify-between mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${config.color}`}>
            <Icon size={12} />
            {config.label}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-olive text-xs">
              <Check size={14} />
            </span>
          )}
        </div>

        <h4 className="font-medium text-gray-700 mb-1 line-clamp-2">{content.title}</h4>
        {content.subtitle && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{content.subtitle}</p>
        )}

        <div className="flex items-center gap-3">
          {content.duration && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Clock size={12} />
              {content.duration}
            </span>
          )}
          {content.recipe && (
            <span className="text-[10px] text-raspberry font-medium">
              {content.recipe.calories} ккал · Б{content.recipe.protein} Ж{content.recipe.fat} У{content.recipe.carbs}
            </span>
          )}
        </div>
      </button>
    </Card>
  );
};

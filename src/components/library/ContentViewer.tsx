import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ContentItem, ContentProgress } from '../../types';
import { markContentComplete, toggleBookmark } from '../../utils/storage';
import { ArrowLeft, Bookmark, BookmarkCheck, Check, Clock, Users, Flame } from 'lucide-react';

interface Props {
  content: ContentItem;
  progress?: ContentProgress;
  onBack: () => void;
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="font-serif text-2xl text-raspberry mt-6 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="font-serif text-lg text-gray-700 mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2 mb-3">
          {items.map((item, idx) => <li key={idx}>{formatInline(item)}</li>)}
        </ul>
      );
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2 mb-3">
          {items.map((item, idx) => <li key={idx}>{formatInline(item)}</li>)}
        </ol>
      );
      continue;
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-cream-dark/30 my-4" />);
    } else if (line.startsWith('|')) {
      // Simple table rendering
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter(l => !l.match(/^\|[\s-:|]+\|$/));
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-3">
          <table className="text-sm w-full">
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className={idx === 0 ? 'font-medium text-gray-700' : 'text-gray-600'}>
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="py-1.5 px-3 border-b border-cream">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(<p key={i} className="text-sm text-gray-400 italic mb-2">{line.slice(1, -1)}</p>);
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(<p key={i} className="text-sm text-gray-600 leading-relaxed mb-2">{formatInline(line)}</p>);
    }
    i++;
  }

  return elements;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-medium text-gray-700">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export const ContentViewer: React.FC<Props> = ({ content, progress, onBack }) => {
  const isCompleted = !!progress?.completedAt;
  const isBookmarked = !!progress?.bookmarked;

  const handleComplete = () => {
    markContentComplete(content.id);
    onBack();
  };

  const handleBookmark = () => {
    toggleBookmark(content.id);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Назад
        </button>
        <button onClick={handleBookmark} className="text-gray-400 hover:text-raspberry transition-colors">
          {isBookmarked ? <BookmarkCheck size={20} className="text-raspberry" /> : <Bookmark size={20} />}
        </button>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-serif text-3xl text-raspberry mb-2">{content.title}</h3>
        {content.subtitle && <p className="text-gray-500">{content.subtitle}</p>}
        {content.duration && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-2">
            <Clock size={12} />
            {content.duration}
          </span>
        )}
      </div>

      {/* Recipe header */}
      {content.recipe && (
        <Card className="!bg-powder-light">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <Flame size={16} className="mx-auto text-raspberry mb-1" />
              <p className="font-serif text-lg text-raspberry">{content.recipe.calories}</p>
              <p className="text-[10px] text-gray-400">ккал</p>
            </div>
            <div>
              <p className="font-serif text-lg text-olive">{content.recipe.protein}</p>
              <p className="text-[10px] text-gray-400">белки</p>
            </div>
            <div>
              <p className="font-serif text-lg text-bright-pink">{content.recipe.fat}</p>
              <p className="text-[10px] text-gray-400">жиры</p>
            </div>
            <div>
              <p className="font-serif text-lg text-yellow-600">{content.recipe.carbs}</p>
              <p className="text-[10px] text-gray-400">углеводы</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock size={12} /> {content.recipe.prepTime + content.recipe.cookTime} мин</span>
            <span className="flex items-center gap-1"><Users size={12} /> {content.recipe.servings} порц.</span>
          </div>
        </Card>
      )}

      {/* Recipe ingredients */}
      {content.recipe && (
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-3">Ингредиенты</p>
          <div className="space-y-2">
            {content.recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{ing.name}</span>
                <span className="text-gray-400">{ing.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recipe steps */}
      {content.recipe && (
        <Card>
          <p className="text-xs uppercase tracking-[0.2em] text-olive font-medium mb-3">Приготовление</p>
          <div className="space-y-3">
            {content.recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-raspberry/10 text-raspberry text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Content body */}
      <Card>
        {renderMarkdown(content.content)}
      </Card>

      {/* Complete button */}
      {!isCompleted ? (
        <Button onClick={handleComplete} className="w-full">
          <Check size={16} className="mr-2" />
          Прочитано
        </Button>
      ) : (
        <div className="text-center py-4">
          <span className="inline-flex items-center gap-2 text-olive text-sm font-medium">
            <Check size={16} />
            Пройдено
          </span>
        </div>
      )}
    </div>
  );
};

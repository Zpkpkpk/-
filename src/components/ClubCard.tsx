import React from 'react';
import { Club } from '../types';
import { Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ClubCardProps {
  club: Club;
  variant?: 'default' | 'compact';
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, variant = 'default' }) => {
  return (
    <div className={cn(
      "group relative bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
      variant === 'compact' ? "flex items-center gap-4 p-4" : "flex flex-col"
    )}>
      {variant === 'default' && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={club.image} 
            alt={club.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <button className="w-full py-2.5 bg-primary text-on-primary rounded-full text-sm font-semibold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              立即申请 <ArrowRight size={16} />
            </button>
          </div>
          
          {club.matchScore && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary-container/90 backdrop-blur-md text-on-primary-container rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} />
              {club.matchScore}% 匹配
            </div>
          )}
        </div>
      )}

      <div className={cn("p-6", variant === 'compact' && "p-0 flex-1")}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
              {club.category}
            </span>
            <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
              {club.name}
            </h3>
          </div>
          {variant === 'compact' && club.matchScore && (
            <div className="px-2 py-1 bg-primary-container text-on-primary-container rounded-lg text-[10px] font-bold">
              {club.matchScore}%
            </div>
          )}
        </div>

        <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">
          {club.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <Users size={14} className="text-primary" />
              <span className="font-medium">{club.memberCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <TrendingUp size={14} />
              <span className="font-medium">+{club.growth}%</span>
            </div>
          </div>
          
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/seed/${club.id}-${i}/40/40`} 
                alt="Member" 
                className="w-6 h-6 rounded-full border-2 border-surface-container-low"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

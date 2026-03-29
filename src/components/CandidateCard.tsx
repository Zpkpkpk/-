import React from 'react';
import { Candidate } from '../types';
import { Sparkles, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  onViewResume?: (candidate: Candidate) => void;
  onAdmit?: (id: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  isSelected = false, 
  onToggleSelect, 
  onViewResume,
  onAdmit
}) => {
  return (
    <div className={cn(
      "group bg-surface-container-lowest rounded-2xl p-5 border transition-all hover:shadow-lg",
      isSelected ? "border-primary ring-1 ring-primary" : "border-outline-variant hover:border-primary/30"
    )}>
      <div className="flex items-start gap-4 mb-5">
        <div className="relative">
          <img 
            src={candidate.image} 
            alt={candidate.name} 
            className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          {candidate.isTopMatch && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center shadow-sm">
              <Sparkles size={12} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-on-surface truncate">
              {candidate.name}
            </h4>
            <div className="flex items-center gap-1 text-primary font-bold text-sm">
              <Sparkles size={14} />
              {candidate.score}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-y-1 gap-x-3">
            <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
              <GraduationCap size={12} />
              {candidate.major}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
              <MapPin size={12} />
              {candidate.year}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {candidate.skills.map((skill) => (
          <span 
            key={skill} 
            className="px-2 py-1 bg-surface-container text-[10px] font-medium text-on-surface-variant rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onViewResume?.(candidate)}
          className="flex-1 py-2 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-xs font-bold rounded-xl transition-all"
        >
          查看简历
        </button>
        <button 
          onClick={() => onToggleSelect?.(candidate.id)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
            isSelected ? "bg-primary text-on-primary" : "bg-secondary-container text-on-secondary-container hover:scale-105"
          )}
        >
          <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
};

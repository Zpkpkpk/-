import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Grid, List, ArrowRight } from 'lucide-react';
import { MOCK_CLUBS } from '../constants';
import { ClubCard } from '../components/ClubCard';
import { cn } from '../lib/utils';

export const Clubs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const categories = ['全部', '学术科技', '文化艺术', '体育竞技', '公益实践', '创新创业'];

  const filteredClubs = useMemo(() => {
    return MOCK_CLUBS.filter(club => {
      const matchesCategory = selectedCategory === '全部' || club.category === selectedCategory;
      const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           club.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);
  
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black text-on-surface mb-2 tracking-tight">探索社团</h2>
          <p className="text-on-surface-variant font-medium">发现您的下一个激情所在</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="搜索社团名称或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-3 border border-outline-variant rounded-xl transition-all",
                viewMode === 'grid' ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-low text-on-surface-variant hover:text-primary"
              )}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-3 border border-outline-variant rounded-xl transition-all",
                viewMode === 'list' ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-low text-on-surface-variant hover:text-primary"
              )}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'bg-surface-container-low text-on-surface-variant border border-outline-variant hover:border-primary/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={cn(
        "grid gap-8",
        viewMode === 'grid' ? "grid-cols-3" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredClubs.map((club, i) => (
            <motion.div
              key={club.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ClubCard club={club} variant={viewMode === 'list' ? 'compact' : 'default'} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredClubs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-bold">未找到匹配的社团</p>
          <p className="text-sm">尝试更换搜索词或分类</p>
        </div>
      )}
    </div>
  );
};

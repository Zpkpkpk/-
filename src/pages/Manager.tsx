import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, Search, Filter, ArrowUpDown, CheckCircle2, XCircle, Clock, X, Mail, Phone, Calendar, BookOpen, Award } from 'lucide-react';
import { MOCK_CANDIDATES } from '../constants';
import { CandidateCard } from '../components/CandidateCard';
import { Candidate } from '../types';
import { cn } from '../lib/utils';

export const Manager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [filterStatus, setFilterStatus] = useState<'all' | 'top'>('all');

  const filteredCandidates = useMemo(() => {
    let result = MOCK_CANDIDATES.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filterStatus === 'top') {
      result = result.filter(c => c.isTopMatch);
    }

    result.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [searchQuery, sortBy, filterStatus]);

  const toggleSelect = (id: string) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBatchAdmit = () => {
    if (selectedCandidates.length === 0) return;
    alert(`已成功录取 ${selectedCandidates.length} 位候选人！`);
    setSelectedCandidates([]);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tight">候选人筛选</h2>
          <p className="text-on-surface-variant font-medium">高效筛选，助您快速锁定高质量人才</p>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {selectedCandidates.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleBatchAdmit}
                className="px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2"
              >
                <CheckCircle2 size={18} /> 批量录取 ({selectedCandidates.length})
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: '待处理', value: '42', icon: Clock, color: 'text-tertiary' },
          { label: '已录取', value: '18', icon: CheckCircle2, color: 'text-primary' },
          { label: '已淘汰', value: '12', icon: XCircle, color: 'text-error' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-surface-container-low border border-outline-variant rounded-3xl flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-on-surface">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="搜索候选人姓名、技能或专业..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setFilterStatus(prev => prev === 'all' ? 'top' : 'all')}
            className={cn(
              "px-6 py-4 border border-outline-variant rounded-2xl font-bold flex items-center gap-2 transition-all",
              filterStatus === 'top' ? "bg-primary text-on-primary" : "bg-surface-container-low hover:bg-surface-container"
            )}
          >
            <Filter size={18} /> {filterStatus === 'top' ? '仅看高匹配' : '全部筛选'}
          </button>
          <button 
            onClick={() => setSortBy(prev => prev === 'score' ? 'name' : 'score')}
            className="px-6 py-4 bg-surface-container-low border border-outline-variant rounded-2xl font-bold flex items-center gap-2 hover:bg-surface-container transition-all"
          >
            <ArrowUpDown size={18} /> {sortBy === 'score' ? '按分数排序' : '按姓名排序'}
          </button>
        </div>
      </div>

      {/* Candidate List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <CandidateCard 
              candidate={candidate} 
              isSelected={selectedCandidates.includes(candidate.id)}
              onToggleSelect={toggleSelect}
              onViewResume={setViewingCandidate}
            />
          </motion.div>
        ))}
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {viewingCandidate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingCandidate(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-surface shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => setViewingCandidate(null)}
                    className="p-2 hover:bg-surface-container rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm">
                      立即录取
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-10">
                  <img 
                    src={viewingCandidate.image} 
                    alt={viewingCandidate.name} 
                    className="w-24 h-24 rounded-3xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-3xl font-black text-on-surface leading-tight">{viewingCandidate.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-bold">
                        {viewingCandidate.score} 匹配分
                      </span>
                      {viewingCandidate.isTopMatch && (
                        <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold">
                          高潜力人才
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">基本信息</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <BookOpen size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">专业</span>
                        </div>
                        <p className="font-bold">{viewingCandidate.major}</p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <Calendar size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">年级</span>
                        </div>
                        <p className="font-bold">{viewingCandidate.year}</p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <Mail size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">邮箱</span>
                        </div>
                        <p className="font-bold text-sm truncate">{viewingCandidate.name.toLowerCase()}@example.com</p>
                      </div>
                      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <Phone size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">电话</span>
                        </div>
                        <p className="font-bold text-sm">138-xxxx-xxxx</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">核心技能</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewingCandidate.skills.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-surface-container-high text-on-surface rounded-xl text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">个人简介</h4>
                    <p className="text-on-surface-variant leading-relaxed">
                      热爱{viewingCandidate.major}，在大学期间积极参与各类社团活动。具有良好的团队协作能力和沟通能力。
                      希望能加入贵社团，共同学习进步，为社团贡献自己的一份力量。
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">获奖经历</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Award className="text-tertiary shrink-0 mt-1" size={18} />
                        <div>
                          <p className="font-bold">校级一等奖学金</p>
                          <p className="text-xs text-on-surface-variant">2025年12月</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="text-tertiary shrink-0 mt-1" size={18} />
                        <div>
                          <p className="font-bold">全国大学生数学建模竞赛 二等奖</p>
                          <p className="text-xs text-on-surface-variant">2025年10月</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

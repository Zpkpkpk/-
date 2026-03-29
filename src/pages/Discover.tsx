import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, TrendingUp, Users, Calendar, Zap } from 'lucide-react';
import { MOCK_CLUBS, MOCK_CANDIDATES } from '../constants';
import { ClubCard } from '../components/ClubCard';
import { CandidateCard } from '../components/CandidateCard';

export const Discover: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden bg-primary-container group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-fixed/40 z-10"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDINbn3IyoCku2qFL2CIwoMvbiwScVN2wJQWUIHgqfWvUOeNvaJFDRz8uqLOmRYxgzeloNqZahRuYiq5lFM--6x-Vw-JnXne1Q-y2ZouxlUdjpj1adar1ODseOvVPrx3fB_iYTPUoJAem5OKEAi9g2l8C9Y_gsP8OEQLoijwfJKSMz7-peImJDY7tFzM2dKMA0HmVx6MxjlhuNZuIYiaYMSeR7sGotHnw3T1MSeZkfznxd2U9L_G3rfwkxGrDGETtXBT-G6jGdYfL6c" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl text-on-primary">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-black mb-6 leading-[1.1] tracking-tight"
          >
            发现最适合你的<br />
            <span className="text-tertiary-fixed italic">校园社团</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-on-primary/80 mb-10 leading-relaxed font-medium"
          >
            基于您的兴趣、技能和课表，Campus Pulse 为您精准推荐最能发挥潜力的社团组织。
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <button 
              onClick={() => navigate('/clubs')}
              className="px-8 py-4 bg-tertiary text-on-tertiary rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:shadow-tertiary/20 hover:-translate-y-1 transition-all"
            >
              开始匹配 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/clubs')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all"
            >
              浏览全部
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-4 gap-6">
        {[
          { icon: Users, label: '活跃社团', value: '450+', color: 'primary' },
          { icon: Zap, label: '本周招新', value: '1,200+', color: 'secondary' },
          { icon: Calendar, label: '近期活动', value: '86', color: 'tertiary' },
          { icon: TrendingUp, label: '匹配成功率', value: '94%', color: 'primary' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex items-center gap-5 hover:border-primary/30 transition-colors"
          >
            <div className={`w-12 h-12 bg-${stat.color}-container text-on-${stat.color}-container rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-on-surface">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recommended Clubs */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black text-on-surface mb-2 tracking-tight">为您推荐</h3>
            <p className="text-on-surface-variant font-medium">基于您的 AI 匹配报告</p>
          </div>
          <button 
            onClick={() => navigate('/clubs')}
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            查看更多 <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {MOCK_CLUBS.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ClubCard club={club} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

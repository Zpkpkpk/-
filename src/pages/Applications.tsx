import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_APPLICATIONS } from '../constants';
import { Clock, CheckCircle2, XCircle, MessageSquare, ArrowRight, X, Calendar, MapPin, User, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

export const Applications: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const selectedApp = MOCK_APPLICATIONS.find(app => app.id === selectedAppId);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'admitted': return 'bg-primary-container text-on-primary-container border-primary/20';
      case 'interview': return 'bg-secondary-container text-on-secondary-container border-secondary/20';
      case 'screening': return 'bg-tertiary-container text-on-tertiary-container border-tertiary/20';
      case 'rejected': return 'bg-error-container text-on-error-container border-error/20';
      default: return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'admitted': return <CheckCircle2 size={16} />;
      case 'interview': return <MessageSquare size={16} />;
      case 'screening': return <Clock size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'admitted': return '已录取';
      case 'interview': return '面试中';
      case 'screening': return '筛选中';
      case 'rejected': return '未通过';
      case 'applied': return '已申请';
      default: return status;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-4xl font-black text-on-surface mb-2 tracking-tight">我的申请</h2>
        <p className="text-on-surface-variant font-medium">实时追踪您的社团招新进度</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-primary-container/30 p-6 rounded-3xl border border-primary/10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">活跃申请</p>
          <p className="text-4xl font-black text-on-surface">08</p>
        </div>
        <div className="bg-secondary-container/30 p-6 rounded-3xl border border-secondary/10">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">面试邀请</p>
          <p className="text-4xl font-black text-on-surface">02</p>
        </div>
        <div className="bg-tertiary-container/30 p-6 rounded-3xl border border-tertiary/10">
          <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">已获录取</p>
          <p className="text-4xl font-black text-on-surface">01</p>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant overflow-hidden">
        <div className="p-8 border-b border-outline-variant flex items-center justify-between bg-white/50">
          <h3 className="text-xl font-bold">申请列表</h3>
        </div>
        
        <div className="divide-y divide-outline-variant/30">
          {MOCK_APPLICATIONS.map((app, i) => (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 flex items-center justify-between hover:bg-surface-container-high/20 transition-colors group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Zap size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-on-surface">{app.clubName}</h4>
                    <span className="px-2 py-0.5 bg-surface-container text-[10px] font-bold text-on-surface-variant rounded uppercase tracking-wider">
                      {app.clubCategory}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium">申请职位：{app.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">更新于</p>
                  <p className="text-sm font-bold text-on-surface">{app.lastUpdated}</p>
                </div>
                
                <div className={cn(
                  "px-4 py-2 rounded-xl border flex items-center gap-2 text-sm font-bold min-w-[120px] justify-center",
                  getStatusStyles(app.status)
                )}>
                  {getStatusIcon(app.status)}
                  {getStatusLabel(app.status)}
                </div>
                
                <button 
                  onClick={() => setSelectedAppId(app.id)}
                  className="p-3 bg-surface-container border border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-all"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Slide-over */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppId(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => setSelectedAppId(null)}
                    className="p-2 hover:bg-surface-container rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <div className={cn(
                    "px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2",
                    getStatusStyles(selectedApp.status)
                  )}>
                    {getStatusIcon(selectedApp.status)}
                    {getStatusLabel(selectedApp.status)}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-surface-container-highest rounded-3xl flex items-center justify-center text-primary">
                    <Zap size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-on-surface leading-tight">{selectedApp.clubName}</h3>
                    <p className="text-on-surface-variant font-bold uppercase text-xs tracking-widest mt-1">{selectedApp.clubCategory}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">申请详情</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <User className="text-primary" size={20} />
                        <div>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">申请职位</p>
                          <p className="font-bold">{selectedApp.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                        <Calendar className="text-primary" size={20} />
                        <div>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">最后更新</p>
                          <p className="font-bold">{selectedApp.lastUpdated}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">当前进度</h4>
                    <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant">
                      <div className="relative">
                        <div className="absolute -left-8 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center z-10">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="font-bold">提交申请</p>
                        <p className="text-xs text-on-surface-variant">2026-03-25 14:30</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-8 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center z-10">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="font-bold">初步筛选</p>
                        <p className="text-xs text-on-surface-variant">2026-03-26 10:15</p>
                      </div>
                      <div className="relative">
                        <div className={cn(
                          "absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center z-10",
                          selectedApp.status === 'interview' || selectedApp.status === 'admitted' ? "bg-primary text-on-primary" : "bg-surface-container border-2 border-outline-variant text-on-surface-variant"
                        )}>
                          {selectedApp.status === 'interview' || selectedApp.status === 'admitted' ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-current rounded-full" />}
                        </div>
                        <p className={cn("font-bold", selectedApp.status === 'screening' && "text-on-surface-variant")}>面试环节</p>
                        <p className="text-xs text-on-surface-variant">{selectedApp.status === 'interview' ? "进行中" : selectedApp.status === 'admitted' ? "已完成" : "等待中"}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">面试信息</h4>
                    {selectedApp.status === 'interview' ? (
                      <div className="p-6 bg-secondary-container/20 border border-secondary/20 rounded-3xl">
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin size={18} className="text-secondary" />
                          <p className="font-bold text-on-secondary-container">学生活动中心 302 室</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-secondary" />
                          <p className="font-bold text-on-secondary-container">本周五 15:00 - 16:00</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-surface-container-low border border-dashed border-outline-variant rounded-3xl text-center">
                        <p className="text-sm text-on-surface-variant font-medium italic">暂无面试安排</p>
                      </div>
                    )}
                  </section>

                  <div className="pt-8 flex gap-4">
                    <button className="flex-1 py-4 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20">
                      联系负责人
                    </button>
                    <button className="px-6 py-4 bg-surface-container border border-outline-variant rounded-2xl font-bold text-on-surface-variant">
                      撤回申请
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Zap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

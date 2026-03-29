import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Search, Bell, Sparkles, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: '申请通过', content: '恭喜！你已被 AI 机器人实验室 录取。', time: '2小时前', type: 'success' },
    { id: 2, title: '面试邀请', content: '数字艺术公社 邀请你参加本周五的面试。', time: '5小时前', type: 'info' },
    { id: 3, title: '社团动态', content: '巅峰户外社 发布了新的活动预告。', time: '昨天', type: 'info' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="搜索社团、活动或技能..."
              className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-surface-container-high border border-outline-variant rounded-2xl shadow-2xl z-30 overflow-hidden"
                    >
                      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                        <h4 className="font-bold text-on-surface">通知中心</h4>
                        <button className="text-xs text-primary font-bold">全部已读</button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-4 border-b border-outline-variant/50 hover:bg-surface-container transition-colors cursor-pointer">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                n.type === 'success' ? 'bg-primary-container text-primary' : 'bg-secondary-container text-secondary'
                              }`}>
                                {n.type === 'success' ? <Check size={14} /> : <Bell size={14} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-on-surface truncate">{n.title}</p>
                                <p className="text-xs text-on-surface-variant line-clamp-2 mt-0.5">{n.content}</p>
                                <p className="text-[10px] text-on-surface-variant/60 mt-2 uppercase tracking-wider">{n.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center">
                        <button className="text-xs text-on-surface-variant hover:text-primary font-medium">查看所有通知</button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

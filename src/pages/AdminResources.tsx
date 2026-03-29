import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Calendar, 
  Zap, 
  AlertTriangle, 
  CheckCircle2,
  X,
  Clock,
  MapPin,
  Users,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminResources: React.FC = () => {
  const [showScheduling, setShowScheduling] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const resources = [
    { id: 1, name: '大礼堂', type: '场地', status: '冲突', club: '街舞社 vs 话剧社', time: '18:00 - 21:00', color: 'text-error', description: '由于两社团均申请了周五晚间的彩排时段，造成场地占用冲突。' },
    { id: 2, name: '多功能厅', type: '场地', status: '正常', club: '辩论社', time: '14:00 - 16:00', color: 'text-primary', description: '场地状态良好，已按计划分配给辩论社进行周赛。' },
    { id: 3, name: '音响设备 A', type: '设备', status: '正常', club: '吉他社', time: '19:00 - 22:00', color: 'text-primary', description: '设备已检修，状态正常，由吉他社借用。' },
    { id: 4, name: '投影仪 B', type: '设备', status: '正常', club: '电影协会', time: '18:30 - 21:30', color: 'text-primary', description: '高清投影仪，状态正常，电影协会周映使用。' },
  ];

  const handleRunScheduling = () => {
    setIsScheduling(true);
    setTimeout(() => {
      setIsScheduling(false);
      setShowScheduling(false);
      // In a real app, we'd update the state here
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-on-surface tracking-tight">资源监控</h2>
          <p className="text-on-surface-variant font-medium">全局掌控社团招新资源，确保公平高效</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowScheduling(true)}
            className="px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2"
          >
            <Zap size={18} /> 智能调度
          </button>
        </div>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '总场地', value: '24', icon: Calendar, color: 'text-primary' },
          { label: '总设备', value: '156', icon: Zap, color: 'text-tertiary' },
          { label: '资源冲突', value: '3', icon: AlertTriangle, color: 'text-error' },
          { label: '已审批', value: '128', icon: CheckCircle2, color: 'text-primary' },
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

      {/* Resource List */}
      <div className="bg-surface-container-low border border-outline-variant rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant flex items-center justify-between">
          <h3 className="text-xl font-bold text-on-surface">实时资源占用</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-sm font-bold flex items-center gap-2">
              <Filter size={16} /> 筛选
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/50 text-on-surface-variant text-xs font-bold uppercase tracking-widest">
                <th className="px-6 py-4">资源名称</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4">使用社团</th>
                <th className="px-6 py-4">时间段</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {resources.map((res) => (
                <tr key={res.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">{res.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{res.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.status === '冲突' ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{res.club}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{res.time}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedResource(res)}
                      className="text-primary font-bold hover:underline"
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intelligent Scheduling Modal */}
      <AnimatePresence>
        {showScheduling && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface max-w-lg w-full rounded-[2.5rem] p-8 shadow-2xl border border-outline-variant relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-on-surface">智能调度引擎</h3>
                  </div>
                  <button onClick={() => setShowScheduling(false)} className="p-2 hover:bg-surface-container rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="text-error" size={20} />
                      <span className="font-bold">检测到 3 处资源冲突</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      系统将根据社团星级、申请先后顺序及历史占用情况，自动重新分配冲突资源，并向相关社团负责人发送调整通知。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>分析进度</span>
                      <span>{isScheduling ? '正在计算最优解...' : '准备就绪'}</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isScheduling ? '100%' : '0%' }}
                        transition={{ duration: 2 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowScheduling(false)}
                      className="flex-1 py-4 border border-outline-variant rounded-2xl font-bold hover:bg-surface-container transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleRunScheduling}
                      disabled={isScheduling}
                      className="flex-1 py-4 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isScheduling ? '调度中...' : '开始自动调度'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resource Details Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-surface max-w-xl w-full rounded-[2.5rem] p-10 shadow-2xl border border-outline-variant relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      selectedResource.status === '冲突' ? "bg-error-container text-on-error-container" : "bg-primary-container text-on-primary-container"
                    )}>
                      {selectedResource.type === '场地' ? <MapPin size={28} /> : <Zap size={28} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-on-surface">{selectedResource.name}</h3>
                      <p className="text-on-surface-variant font-medium">{selectedResource.type}详情</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedResource(null)} className="p-3 hover:bg-surface-container rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-surface-container rounded-3xl">
                      <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">占用时间段</span>
                      </div>
                      <p className="text-lg font-bold">{selectedResource.time}</p>
                    </div>
                    <div className="p-6 bg-surface-container rounded-3xl">
                      <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                        <Users size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">使用社团</span>
                      </div>
                      <p className="text-lg font-bold">{selectedResource.club}</p>
                    </div>
                  </div>

                  <div className="p-8 bg-surface-container rounded-[2rem] border border-outline-variant">
                    <div className="flex items-center gap-3 mb-4">
                      <Info size={20} className="text-primary" />
                      <h4 className="font-bold">状态说明</h4>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      {selectedResource.description}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setSelectedResource(null)}
                      className="flex-1 py-4 bg-on-surface text-surface rounded-2xl font-bold hover:opacity-90 transition-opacity"
                    >
                      关闭
                    </button>
                    {selectedResource.status === '冲突' && (
                      <button className="flex-1 py-4 bg-error text-on-error rounded-2xl font-bold shadow-lg shadow-error/20 hover:opacity-90 transition-opacity">
                        手动调解
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

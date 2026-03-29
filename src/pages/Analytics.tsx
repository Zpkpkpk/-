import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Activity,
  ArrowUpDown,
  Lightbulb,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: '周一', value: 400 },
  { name: '周二', value: 300 },
  { name: '周三', value: 600 },
  { name: '周四', value: 800 },
  { name: '周五', value: 500 },
  { name: '周六', value: 900 },
  { name: '周日', value: 700 },
];

const growthData = [
  { name: '1月', value: 100 },
  { name: '2月', value: 120 },
  { name: '3月', value: 160 },
  { name: '4月', value: 200 },
  { name: '5月', value: 280 },
  { name: '6月', value: 350 },
];

export const Analytics: React.FC = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const userRole = localStorage.getItem('userRole') || 'student';
  const title = userRole === 'admin' ? '数据看板' : '招新分析';
  const subtitle = userRole === 'admin' ? '实时洞察全校社团招新生态' : '实时追踪本社团招新进度与质量';

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-black text-on-surface mb-2 tracking-tight">{title}</h2>
          <p className="text-on-surface-variant font-medium">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Export button removed as per request */}
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: '总申请量', value: '2,840', change: '+12.5%', isUp: true, icon: Target, color: 'primary' },
          { label: '活跃用户', value: '15,200', change: '+8.2%', isUp: true, icon: Users, color: 'secondary' },
          { label: '平均匹配度', value: '88%', change: '+2.4%', isUp: true, icon: Activity, color: 'tertiary' },
          { label: '转化率', value: '24.5%', change: '-1.2%', isUp: false, icon: Zap, color: 'error' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-container text-on-${stat.color}-container rounded-2xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                stat.isUp ? "bg-primary-container/20 text-primary" : "bg-error-container/20 text-error"
              )}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-on-surface">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-surface-container-low rounded-[2.5rem] border border-outline-variant p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity size={24} className="text-primary" />
              <h3 className="text-xl font-bold">申请趋势分析</h3>
            </div>
            <select className="bg-surface-container border border-outline-variant rounded-xl px-4 py-2 text-sm font-bold focus:outline-none">
              <option>最近 7 天</option>
              <option>最近 30 天</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8c4a00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8c4a00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 700, color: '#8c4a00' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8c4a00" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-4 bg-surface-container-low rounded-[2.5rem] border border-outline-variant p-8">
          <div className="flex items-center gap-3 mb-8">
            <PieChart size={24} className="text-secondary" />
            <h3 className="text-xl font-bold">社团类别分布</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: '学术科技', value: 45, color: 'primary' },
              { label: '文化艺术', value: 25, color: 'secondary' },
              { label: '体育竞技', value: 15, color: 'tertiary' },
              { label: '公益实践', value: 10, color: 'outline' },
              { label: '其他', value: 5, color: 'on-surface-variant' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant p-8">
          <h3 className="text-xl font-bold mb-6">热门招新社团</h3>
          <div className="space-y-4">
            {[
              { name: 'AI 机器人实验室', growth: '+42', rank: 1 },
              { name: '街舞社', growth: '+35', rank: 2 },
              { name: '辩论社', growth: '+28', rank: 3 },
            ].map((club) => (
              <div key={club.rank} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-outline-variant/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center font-bold text-primary">
                    {club.rank}
                  </div>
                  <div>
                    <p className="font-bold">{club.name}</p>
                    <p className="text-xs text-on-surface-variant font-medium">本周 {club.growth} 申请</p>
                  </div>
                </div>
                <TrendingUp size={20} className="text-primary" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-on-surface text-surface rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="relative z-10">
            <Lightbulb size={40} className="text-tertiary-fixed mb-6" />
            <h3 className="text-3xl font-black mb-4 leading-tight">招新建议：<br />下周招新高峰期</h3>
            <p className="text-surface/70 mb-8 font-medium max-w-xs">
              根据往年数据与当前活跃度，预计下周二下午 2:00 将迎来本学期最大规模的申请潮。
            </p>
            <button 
              onClick={() => setShowDetails(true)}
              className="px-8 py-4 bg-tertiary text-on-tertiary rounded-2xl font-bold shadow-xl shadow-black/20 hover:scale-105 transition-transform"
            >
              查看详细建议
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
        </div>
      </div>

      {/* Detailed Suggestions Modal */}
      <AnimatePresence>
        {showDetails && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-surface max-w-2xl w-full rounded-[2.5rem] p-10 shadow-2xl border border-outline-variant relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-2xl flex items-center justify-center">
                        <Lightbulb size={28} />
                      </div>
                      <h3 className="text-3xl font-black text-on-surface">详细招新建议</h3>
                    </div>
                    <button 
                      onClick={() => setShowDetails(false)}
                      className="p-3 hover:bg-surface-container rounded-full transition-colors"
                    >
                      <Zap size={24} className="text-on-surface-variant" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div className="p-6 bg-primary-container/10 rounded-3xl border border-primary/10">
                      <h4 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                        <Activity size={20} /> 流量高峰预警
                      </h4>
                      <p className="text-on-surface-variant leading-relaxed">
                        根据过去三年的历史数据，下周二（4月1日）下午 14:00 - 16:00 是全校范围内的申请高峰期。建议本社团在此时间段安排至少 2 名核心成员在线实时解答咨询，并确保报名链接的稳定性。
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-secondary-container/10 rounded-3xl border border-secondary/10">
                        <h4 className="text-lg font-bold text-secondary mb-3 flex items-center gap-2">
                          <Target size={20} /> 精准投放建议
                        </h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          当前数据显示，大一新生对“学术科技”类社团的关注度提升了 15%。建议在新生群和宿舍区加强相关技能展示的宣传。
                        </p>
                      </div>
                      <div className="p-6 bg-tertiary-container/10 rounded-3xl border border-tertiary/10">
                        <h4 className="text-lg font-bold text-tertiary mb-3 flex items-center gap-2">
                          <Users size={20} /> 转化率优化
                        </h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          目前的转化率为 24.5%，略低于去年同期。建议缩短初审反馈周期，从目前的 48 小时缩短至 24 小时内。
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowDetails(false)}
                      className="w-full py-4 bg-on-surface text-surface rounded-2xl font-bold hover:opacity-90 transition-opacity"
                    >
                      我知道了
                    </button>
                  </div>
                </div>
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

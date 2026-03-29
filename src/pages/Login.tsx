import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MessageCircle, Mail, Lock, User, Users, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

type UserRole = 'student' | 'manager' | 'admin';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    
    // Redirect based on role
    if (role === 'student') navigate('/');
    else if (role === 'manager') navigate('/manager');
    else if (role === 'admin') navigate('/analytics');
  };

  const roles = [
    { id: 'student', label: '新生/学生', icon: User, desc: '发现社团，开启校园生活' },
    { id: 'manager', label: '社团负责人', icon: Users, desc: '筛选人才，管理招新进度' },
    { id: 'admin', label: '学校管理员', icon: ShieldCheck, desc: '监控全局，把控招新质量' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      {/* Left Side: Branding & Visuals */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-on-surface text-surface relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Campus Pulse</h1>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black leading-[1.1] tracking-tight"
          >
            连接你的<br />
            <span className="text-primary italic">校园梦想</span>
          </motion.h2>
          <p className="text-surface/60 text-lg max-w-md font-medium">
            加入 500+ 校园社团，开启你的第二课堂。AI 智能匹配，让每个才华都能找到舞台。
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/seed/user-${i}/100/100`} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-on-surface"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <p className="text-sm font-bold text-surface/80">超过 10,000+ 同学已加入</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-on-surface tracking-tight">欢迎回来</h3>
            <p className="text-on-surface-variant font-medium">请选择您的身份并登录</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as UserRole)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                  role === r.id 
                    ? "border-primary bg-primary-container/10 shadow-md" 
                    : "border-outline-variant hover:border-primary/30 bg-surface-container-low"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  role === r.id ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant group-hover:bg-primary/10"
                )}>
                  <r.icon size={24} />
                </div>
                <div>
                  <p className={cn("font-bold", role === r.id ? "text-primary" : "text-on-surface")}>{r.label}</p>
                  <p className="text-xs text-on-surface-variant font-medium">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">校园邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">密码</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">忘记密码？</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              登录系统 <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-surface px-4 text-on-surface-variant">或者通过</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl font-bold hover:bg-surface-container transition-all">
              <MessageCircle size={20} className="text-[#07C160]" />
              微信
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl font-bold hover:bg-surface-container transition-all">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

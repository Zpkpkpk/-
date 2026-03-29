import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Users, 
  FileText, 
  BarChart3, 
  LogOut,
  Sparkles,
  UserCheck,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

const roleNavItems = {
  student: [
    { icon: Compass, label: '发现', path: '/' },
    { icon: Users, label: '探索社团', path: '/clubs' },
    { icon: FileText, label: '我的申请', path: '/applications' },
  ],
  manager: [
    { icon: UserCheck, label: '候选人筛选', path: '/manager' },
    { icon: BarChart3, label: '招新分析', path: '/analytics' },
  ],
  admin: [
    { icon: LayoutDashboard, label: '数据看板', path: '/analytics' },
    { icon: ShieldCheck, label: '资源监控', path: '/admin/resources' },
  ],
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const userRole = (localStorage.getItem('userRole') || 'student') as keyof typeof roleNavItems;
  const navItems = roleNavItems[userRole];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const roleLabels = {
    student: '新生/学生',
    manager: '社团负责人',
    admin: '学校管理员',
  };

  return (
    <aside className="w-64 h-screen bg-surface-container-low border-r border-outline-variant flex flex-col sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
          <Sparkles size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-primary">Campus Pulse</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
              isActive 
                ? "bg-primary-container text-on-primary-container font-semibold shadow-sm" 
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            )}
          >
            <item.icon size={22} className={cn(
              "transition-transform duration-300 group-hover:scale-110",
              "group-[.active]:text-on-primary-container"
            )} />
            <span className="text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-outline-variant space-y-4">
        <div className="flex items-center gap-3 px-2">
          <img 
            src="https://picsum.photos/seed/user/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-primary-container"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">张三</p>
            <p className="text-xs text-on-surface-variant truncate">{roleLabels[userRole]}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error-container/10 rounded-2xl transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
};

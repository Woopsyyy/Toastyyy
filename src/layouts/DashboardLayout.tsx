import { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Layers, Settings, Bell, LogOut,
  Zap, PanelLeftClose, PanelLeft, User, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { cn } from '../utils';

const baseLinks = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Components', to: '/dashboard/components', icon: Layers },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

const adminLinks = [
  { label: 'Pending Requests', to: '/dashboard/pending', icon: ShieldCheck },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarLinks = isAdmin ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-bold text-gray-900 truncate">
                Toasty
              </motion.span>
            )}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
          {sidebarLinks.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/dashboard'}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive ? 'text-[#FF6B35] bg-orange-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                // Highlight admin link differently
                to === '/dashboard/pending' && !({ isActive: false }).isActive
                  ? 'border border-dashed border-amber-200 text-amber-700 hover:bg-amber-50'
                  : ''
              )}>
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Admin badge + User */}
        <div className="p-3 border-t border-gray-100 space-y-2">
          {isAdmin && !collapsed && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold text-amber-700">Admin</span>
            </div>
          )}
          <div className={cn(
            'flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors',
            collapsed && 'justify-center'
          )}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {profile?.username ?? user?.email?.split('@')[0] ?? 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={handleSignOut}
                className="p-1 rounded-lg text-gray-400 hover:text-red-500 transition-colors shrink-0">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-base font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Heart, MessageSquare, Settings, 
  LogOut, Menu, X, ChevronRight, User, Mountain
} from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Favorites', path: '/dashboard/favorites', icon: Heart },
    { name: 'My Inquiries', path: '/dashboard/inquiries', icon: MessageSquare },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-mountain-950 pt-20 flex flex-col lg:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[60]">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-14 h-14 rounded-full bg-mountain-accent text-mountain-950 shadow-xl cinematic-shadow flex items-center justify-center transition-transform active:scale-95"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 pt-24 pb-8 glass border-r border-white/5 transition-transform duration-500 lg:sticky lg:h-screen lg:top-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col px-6">
          <div className="mb-10 p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-mountain-accent/30 p-1">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-mountain-accent/10 flex items-center justify-center">
                  <User size={32} className="text-mountain-accent" />
                </div>
              )}
            </div>
            <h3 className="font-bold text-white mb-1 line-clamp-1">{user?.displayName || 'Explorer'}</h3>
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Base Camp Member</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-6 py-4 rounded-2xl transition-all group
                    ${isActive ? 'bg-mountain-accent text-mountain-950' : 'text-white/50 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                    <span className="font-bold text-sm tracking-wide">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 md:p-12 pb-32 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-mountain-950/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

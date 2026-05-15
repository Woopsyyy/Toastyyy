import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { cn } from '../utils';

const navLinks = [
  { label: 'Docs', to: '/docs' },
  { label: 'Components', to: '/components' },
  { label: 'Playground', to: '/playground' },
  { label: 'Templates', to: '/templates' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isComponentsPage = location.pathname === '/components';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: '#111827' }}>
                Toasty
              </span>
            </Link>

            {/* Desktop nav / Components search */}
            {isComponentsPage ? (
              <div className="hidden md:flex items-center gap-3 flex-1 px-8 max-w-2xl">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search components..."
                    onChange={(e) => {
                      const event = new CustomEvent('components-search', { detail: e.target.value });
                      window.dispatchEvent(event);
                    }}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent sm:text-sm transition-all"
                  />
                </div>
                <select className="pl-3 pr-8 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B35] transition-all">
                  <option>All Styles</option>
                  <option>Tailwind CSS</option>
                </select>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => cn(
                      'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-[#FF6B35] bg-orange-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://github.com/Woopsyyy/Toasty" target="_blank" rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    My Dashboard
                  </Link>
                  <button onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Login
                  </Link>
                  <Link to="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', boxShadow: '0 4px 16px rgba(255,107,53,0.32)' }}>
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl md:hidden"
          >
            <div className="page-container py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'text-[#FF6B35] bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                {user ? (
                  <button onClick={handleSignOut}
                    className="w-full py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors text-left px-4">
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="w-full py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="w-full py-3 text-sm font-semibold text-white rounded-xl text-center"
                      style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import ToastMascot from '../ui/ToastMascot'

const navItems = [
  { path: '/examples', label: 'Examples' },
  { path: '/builder', label: 'Builder' },
  { path: '/docs', label: 'Docs' },
  { path: '/changelog', label: 'Changelog' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <nav className="glass rounded-3xl px-6 py-3 flex items-center justify-between md:justify-start gap-12 shadow-lg pointer-events-auto max-w-5xl w-full">
        <Link 
          to="/" 
          className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-text hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <ToastMascot size={32} interactive={false} />
          </div>
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Toastyyy
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative text-[13px] font-bold text-text-2 hover:text-text transition-colors duration-300 px-4 py-2 rounded-xl flex items-center"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-bg"
                      className="absolute inset-0 bg-surface-2 z-[-1] rounded-xl border border-border-strong"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center ml-auto gap-4">
          <a 
            href="https://github.com/Woopsyyy/ToastyyyWebsite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-2 hover:text-text transition-colors duration-300 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-2 border border-transparent hover:border-border-strong"
          >
            <Github className="w-5 h-5" />
          </a>
          <div className="relative group hidden sm:block">
            <button 
              onClick={() => navigator.clipboard.writeText('npm install toastyyy')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-accent to-accent-2 hover:scale-[1.03] transition-transform duration-300 shadow-md"
            >
              npm i toastyyy
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

const navItems = [
  { path: '/examples', label: 'Examples' },
  { path: '/builder', label: 'Builder' },
  { path: '/docs', label: 'Docs' },
  { path: '/changelog', label: 'Changelog' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <nav className="glass rounded-2xl px-6 py-3 flex items-center gap-8 shadow-sm pointer-events-auto">
        <Link 
          to="/" 
          className="font-bold text-lg tracking-tight bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Toastyyy
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative text-sm font-medium text-text-2 hover:text-text transition-colors duration-200 px-1 py-1"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[6px] left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center pl-4 border-l border-border gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-3 hover:text-text transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <button className="btn-primary text-xs py-2 px-4 shadow-accent">
            npm i toasty
          </button>
        </div>
      </nav>
    </header>
  )
}

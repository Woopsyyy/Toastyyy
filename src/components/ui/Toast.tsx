import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Loader2, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading' | 'promise'

interface ToastProps {
  id: string
  type: ToastType
  title: string
  description?: string
  showDescription?: boolean
  showAction?: boolean
  actionText?: string
  customColor?: string
  hasBorder?: boolean
  bounce?: number
  theme?: 'light' | 'dark'
  duration?: number
  onClose: (id: string) => void
  showProgress?: boolean
  closeOnEscape?: boolean
  showTimestamp?: boolean
  showCloseButton?: boolean
}

const icons = {
  default: null,
  success: <CheckCircle2 className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  info: <Info className="w-5 h-5 text-info" />,
  loading: <Loader2 className="w-5 h-5 text-accent animate-spin" />,
  promise: <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />,
}

export default function Toast({ 
  id, 
  type, 
  title, 
  description, 
  showDescription = true,
  showAction = false,
  actionText = 'Action',
  customColor,
  hasBorder = true,
  bounce = 0.40,
  theme = 'light',
  duration = 5000, 
  onClose,
  showProgress = true,
  closeOnEscape = false,
  showTimestamp = false,
  showCloseButton = true
}: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [timestamp] = useState(() => {
    const now = new Date()
    return now.toTimeString().split(' ')[0]
  })

  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      
      if (remaining === 0) {
        clearInterval(timer)
        onClose(id)
      }
    }, 10)

    return () => clearInterval(timer)
  }, [id, duration, onClose])

  useEffect(() => {
    if (!closeOnEscape) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [id, closeOnEscape, onClose])

  const isDark = theme === 'dark'
  const containerClasses = `toast group ${isDark ? '!bg-[#12131a] !text-white !border-white/10 shadow-xl shadow-black/30' : ''} ${hasBorder === false ? '!border-transparent' : ''}`

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        bounce: bounce,
        duration: 0.6
      }}
      className={containerClasses}
      style={customColor && hasBorder !== false ? { borderColor: customColor } : undefined}
    >
      <div className="flex gap-3 w-full items-start">
        {icons[type] && (
          <div className="mt-0.5 flex-shrink-0">
            {icons[type]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {showTimestamp && (
              <span className="text-[10px] font-bold text-text-3 font-mono">
                [{timestamp}]
              </span>
            )}
            <h4 className="text-sm font-semibold truncate">{title}</h4>
          </div>
          {showDescription && description && (
            <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-white/60' : 'text-text-2'}`}>
              {description}
            </p>
          )}
          {showAction && actionText && (
            <div className="mt-2">
              <button 
                onClick={() => onClose(id)}
                className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-accent text-white hover:opacity-90 transition-opacity"
                style={customColor ? { backgroundColor: customColor } : undefined}
              >
                {actionText}
              </button>
            </div>
          )}
        </div>

        {showCloseButton && (
          <button 
            onClick={() => onClose(id)}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-2 transition-all duration-200"
          >
            <X className="w-4 h-4 text-text-3" />
          </button>
        )}
      </div>

      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-2">
          <motion.div 
            className="h-full bg-brand-500"
            style={customColor ? { backgroundColor: customColor } : undefined}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Loader2, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading' | 'promise'

interface ToastProps {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  onClose: (id: string) => void
  showProgress?: boolean
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
  duration = 5000, 
  onClose,
  showProgress = true
}: ToastProps) {
  const [progress, setProgress] = useState(100)

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="toast group"
    >
      <div className="flex gap-3 w-full">
        {icons[type] && (
          <div className="mt-0.5 flex-shrink-0">
            {icons[type]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text truncate">{title}</h4>
          {description && (
            <p className="mt-1 text-xs text-text-2 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <button 
          onClick={() => onClose(id)}
          className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-2 transition-all duration-200"
        >
          <X className="w-4 h-4 text-text-3" />
        </button>
      </div>

      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-2">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  )
}

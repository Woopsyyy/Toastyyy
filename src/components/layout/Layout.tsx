import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useToasts } from '../../hooks/useToasts'
import Toast from '../ui/Toast'
import { AnimatePresence } from 'framer-motion'

export default function Layout() {
  const { toasts, removeToast } = useToasts()

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-100 selection:text-brand-900">
      <div className="fixed inset-0 z-[-1] mesh-bg noise" />
      
      <Navbar />
      
      <main className="flex-1 flex flex-col mt-16 lg:mt-20">
        <Outlet />
      </main>

      {(['top-left', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => {
        const positionToasts = toasts.filter((t) => (t.position || 'bottom-right') === pos)
        
        let positionClasses = 'bottom-6 right-6'
        if (pos === 'top-left') positionClasses = 'top-24 left-6'
        else if (pos === 'top-right') positionClasses = 'top-24 right-6'
        else if (pos === 'bottom-left') positionClasses = 'bottom-6 left-6'
        else if (pos === 'bottom-center') positionClasses = 'bottom-6 left-1/2 -translate-x-1/2 items-center'

        return (
          <div key={pos} className={`fixed ${positionClasses} z-[100] flex flex-col gap-3 pointer-events-none`}>
            <AnimatePresence mode="popLayout">
              {positionToasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={removeToast} />
              ))}
            </AnimatePresence>
          </div>
        )
      })}

      <Footer />
    </div>
  )
}

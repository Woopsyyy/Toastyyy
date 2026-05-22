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
      {/* Global Background */}
      <div className="fixed inset-0 z-[-1] mesh-bg noise" />
      
      <Navbar />
      
      <main className="flex-1 flex flex-col mt-16 lg:mt-20">
        <Outlet />
      </main>

      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}

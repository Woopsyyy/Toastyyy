import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, ArrowRight, Zap, Layers, Code2, Heart, Copy, Check, Star } from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import ToastMascot from '../components/ui/ToastMascot'
import PlaygroundSection from './ExamplesPage'
import DocsSection from './DocsPage'

export default function HomePage() {
  const { addToast, updateToast } = useToasts()
  const [copied, setCopied] = useState(false)
  const [mascotMood, setMascotMood] = useState<'happy' | 'focused' | 'sleepy' | 'excited'>('happy')
  const [mascotBounce, setMascotBounce] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // If user scrolls past 200px threshold, trigger mascot bounce & joy mood!
      if (Math.abs(currentScrollY - lastScrollY) > 200) {
        setMascotBounce(true)
        setMascotMood('excited')
        setTimeout(() => {
          setMascotBounce(false)
          setMascotMood('happy')
        }, 1200)
        lastScrollY = currentScrollY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const scrollToTarget = () => {
      const hash = location.hash || ''
      const path = location.pathname || ''
      
      let elementId = ''
      if (path === '/docs' || hash === '#docs') {
        elementId = 'docs'
      } else if (path === '/examples' || path === '/builder' || hash === '#playground') {
        elementId = 'playground'
      }

      if (elementId) {
        const element = document.getElementById(elementId)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      } else if (path === '/' && !hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    scrollToTarget()
  }, [location])

  const copyCommand = () => {
    navigator.clipboard.writeText('npm install toastyy')
    setCopied(true)
    addToast({
      type: 'success',
      title: 'Command Copied!',
      description: 'Run it in your terminal to install Toastyy.',
    })
    setMascotMood('excited')
    setTimeout(() => {
      setCopied(false)
      setMascotMood('happy')
    }, 2000)
  }

  const handleBuyCoffee = () => {
    setMascotMood('excited')
    setMascotBounce(true)
    setTimeout(() => setMascotBounce(false), 1000)

    const id = addToast({
      type: 'loading',
      title: 'Brewing premium espresso...',
      description: 'Roasting selected single-origin beans...',
      showDescription: true,
      duration: 8000,
      customColor: '#d97706'
    })

    setTimeout(() => {
      updateToast(id, {
        type: 'success',
        title: 'Coffee Purchased! ☕✨',
        description: 'You are an absolute legend! Thank you so much for supporting my solo dev journey!',
        showDescription: true,
        customColor: '#b45309',
        bounce: 0.50
      })
      setMascotMood('excited')
    }, 2000)
  }

  const firePresetToast = (type: 'success' | 'error' | 'warning' | 'info' | 'default', title: string, desc: string, mood: 'happy' | 'excited' | 'focused' | 'sleepy') => {
    setMascotMood(mood)
    addToast({
      type,
      title,
      description: desc,
      showProgress: true,
      duration: 4000
    })
    setTimeout(() => setMascotMood('happy'), 3000)
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-[#ff8c3b]/5 orb animate-float" />
      <div className="absolute bottom-[20%] right-[-5%] w-[700px] h-[700px] bg-[#e056fd]/5 orb animate-float-delayed" />
      
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 px-6 relative z-10 flex flex-col items-center">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-accent/20 mb-8 cursor-pointer select-none"
            whileHover={{ scale: 1.03 }}
            onClick={() => firePresetToast('default', 'Hello Friend!', 'I am Toastyyy! Click around to explore my states.', 'excited')}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="text-[11px] font-extrabold text-accent-2 tracking-widest uppercase">
              Meet Toastyyy 1.0 • Built for Motion
            </span>
          </motion.div>

          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: mascotBounce ? [1, 1.15, 0.92, 1] : 1,
                rotate: mascotBounce ? [0, -8, 8, -5, 5, 0] : 0,
                opacity: 1 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 18,
                default: { duration: 0.6 }
              }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-purple-500/10 rounded-full blur-2xl opacity-60 animate-pulse" />
              <ToastMascot size={150} mood={mascotMood} interactive={true} />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-text leading-[1.08] mb-8 text-balance"
          >
            Beautifully <span className="gradient-text-warm font-black">animated</span>,<br />
            gooey & <span className="italic font-serif font-semibold text-accent-2">delicious</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-2 mb-12 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            A high-fidelity React notification ecosystem built on buttery spring physics. 
            Bring your interface to life with organic, gooey, hardware-accelerated micro-feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto mb-20"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyCoffee}
              className="btn-primary w-full sm:w-auto px-8 py-4 justify-center text-sm shadow-accent bg-gradient-to-r from-amber-600 to-amber-800 border-none hover:opacity-95"
            >
              Buy Me a Coffee ☕
            </motion.button>

            <div 
              onClick={copyCommand}
              className="flex items-center justify-between w-full sm:w-auto gap-4 px-5 py-4 bg-white border border-border rounded-2xl font-mono text-xs shadow-sm hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden select-none"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-text-2">npm i toastyy</span>
              </div>
              <div className="p-1 rounded-lg bg-surface-2 group-hover:bg-accent/10 transition-colors">
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-text-3 group-hover:text-accent" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/40 backdrop-blur-md border-y border-border-strong relative z-10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text mb-4">
              Tactile Playground Canvas
            </h2>
            <p className="text-text-2 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Every interaction triggers real-time spring transformations. Hover over and click these gourmet flavors to sample Toastyyy's fluid curves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="glass rounded-[32px] p-8 flex flex-col justify-between border-accent/10 hover:border-accent/30 transition-all duration-500 shadow-xl group">
              <div>
                <h3 className="text-xl font-extrabold text-text mb-3">Chef's Specials</h3>
                <p className="text-text-2 text-xs md:text-sm mb-8 leading-relaxed">
                  We've prepared specific preset profiles with tailored spring tension, gooey filters, and custom layouts to suit any user event.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => firePresetToast('success', 'Strawberry Jam Toast', 'Sweet, vibrant, and bursting with berry energy.', 'excited')}
                    className="flex flex-col items-start p-4 rounded-2xl border border-border hover:border-accent/40 bg-white hover:bg-accent/5 transition-all text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 group-hover/btn:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-[13px] font-bold text-text">Strawberry Jam</span>
                    <span className="text-[11px] text-text-3 mt-1 leading-normal">Gooey & Sweet</span>
                  </button>

                  <button 
                    onClick={() => firePresetToast('error', 'Burnt Garlic Slice', 'Warning: High flavor heat detected!', 'sleepy')}
                    className="flex flex-col items-start p-4 rounded-2xl border border-border hover:border-red-500/40 bg-white hover:bg-red-50/5 transition-all text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mb-3 group-hover/btn:scale-105 transition-transform">
                      <Star className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[13px] font-bold text-text">Burnt Garlic</span>
                    <span className="text-[11px] text-text-3 mt-1 leading-normal">Spicy Warning</span>
                  </button>

                  <button 
                    onClick={() => firePresetToast('info', 'Whipped Cream Spread', 'Light, clean, and perfectly balanced cream.', 'happy')}
                    className="flex flex-col items-start p-4 rounded-2xl border border-border hover:border-indigo-500/40 bg-white hover:bg-indigo-50/5 transition-all text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 group-hover/btn:scale-105 transition-transform">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="text-[13px] font-bold text-text">Whipped Cream</span>
                    <span className="text-[11px] text-text-3 mt-1 leading-normal">Info Splash</span>
                  </button>

                  <button 
                    onClick={() => firePresetToast('warning', 'Cheddar Melt Drop', 'Careful, this slice is incredibly hot.', 'focused')}
                    className="flex flex-col items-start p-4 rounded-2xl border border-border hover:border-amber-500/40 bg-white hover:bg-amber-50/5 transition-all text-left group/btn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 group-hover/btn:scale-105 transition-transform">
                      <Layers className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-[13px] font-bold text-text">Cheddar Melt</span>
                    <span className="text-[11px] text-text-3 mt-1 leading-normal">Slow Melt alert</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#ffd899]/30 to-[#ffeebb]/20 border border-accent/10 rounded-[32px] p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl">
              <div className="absolute top-4 left-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
              </div>

              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="w-40 h-40 bg-white rounded-3xl shadow-xl border border-border-strong flex flex-col items-center justify-center text-center p-6 cursor-pointer relative"
              >
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <ToastMascot size={90} mood={mascotMood} interactive={false} />
                <p className="text-[10px] font-extrabold font-mono text-accent mt-3 uppercase tracking-wider">Canvas Live</p>
              </motion.div>

              <div className="mt-8 text-center max-w-xs">
                <h4 className="text-sm font-extrabold text-text mb-1">Organic Gaze Mechanics</h4>
                <p className="text-text-2 text-xs leading-relaxed">
                  Observe the Mascot's focus. Hover over the canvas to see its eyes follow your exact pointer vectors in high precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative z-10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text mb-4">
              Premium Craftsmanship
            </h2>
            <p className="text-text-2 max-w-xl mx-auto leading-relaxed">
              Every detail is engineered with absolute performance in mind. Say goodbye to blocky notifications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[28px] border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text mb-3">60fps Transitions</h3>
                <p className="text-text-2 text-xs md:text-sm leading-relaxed">
                  Leverages CSS GPU transforms and Framer Motion spring physics to maintain absolute layout stability.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[28px] border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text mb-3">Elastic Stacking</h3>
                <p className="text-text-2 text-xs md:text-sm leading-relaxed">
                  Smart notification stack spacing prevents overlapping layouts. Slices stack smoothly with elastic collision.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="p-8 rounded-[28px] border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-text mb-3">Zero Configuration</h3>
                <p className="text-text-2 text-xs md:text-sm leading-relaxed">
                  Plug-and-play architecture integrates right out of the box with zero boilerplate styling.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PlaygroundSection />

      <DocsSection />

      <section className="py-20 px-6 bg-gradient-to-t from-accent/5 to-transparent border-t border-border-strong relative z-10">
        <div className="container-tight text-center">
          <div className="max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-border rounded-full shadow-sm mb-6 text-xs text-text-2 select-none">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>Built by developers, for developers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text mb-6">
              Make your app feel elite
            </h2>
            <p className="text-text-2 text-sm md:text-base mb-10 leading-relaxed text-balance">
              Take the next step in UI excellence. Empower your web applications with Toastyyy's warm, responsive, and delightful notification patterns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary justify-center shadow-accent"
              >
                Return to Top
              </motion.button>
              <motion.a 
                href="https://github.com/Woopsyyy/ToastyyyWebsite"
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost justify-center"
              >
                GitHub Repository
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

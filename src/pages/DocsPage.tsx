import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  ChevronRight, 
  Terminal, 
  Layers, 
  Zap, 
  Copy,
  Check,
  Cpu,
  BookMarked
} from 'lucide-react'
import ToastMascot from '../components/ui/ToastMascot'

const docSections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Installation', 'Quick Start', 'Styling']
  },
  {
    title: 'Components',
    items: ['ToastProvider', 'useToasts Hook', 'Custom Toasts', 'Timing API']
  },
  {
    title: 'Animations',
    items: ['Spring Physics', 'Exit Controls', 'GPU Presets']
  }
]

export default function DocsPage() {
  const [activeItem, setActiveItem] = useState('Introduction')
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedQuick, setCopiedQuick] = useState(false)

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install toastyyy')
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleCopyQuick = () => {
    navigator.clipboard.writeText(`import { ToastProvider } from 'toastyyy'

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  )
}`)
    setCopiedQuick(true)
    setTimeout(() => setCopiedQuick(false), 2000)
  }

  return (
    <div className="container-wide flex flex-col lg:flex-row relative z-10 px-6 gap-8 min-h-screen">
      <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-auto lg:h-[calc(100vh-140px)] overflow-y-auto pr-4 py-8 border-b lg:border-b-0 lg:border-r border-border-strong select-none">
        <div className="mb-6 flex items-center gap-2 px-3">
          <BookMarked className="w-4 h-4 text-accent" />
          <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-widest">Recipe Book</span>
        </div>
        <nav className="space-y-6">
          {docSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-[9px] font-black text-text-3 uppercase tracking-wider px-3">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = activeItem === item
                  return (
                    <li key={item}>
                      <button 
                        onClick={() => setActiveItem(item)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${isActive ? 'text-accent' : 'text-text-2 hover:bg-surface-2 hover:text-text'}`}
                      >
                        {item}
                        {isActive && (
                          <motion.div
                            layoutId="active-doc-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-accent rounded-full"
                          />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 max-w-3xl py-8 lg:py-12">
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <div>
            <div className="flex items-center gap-1.5 text-accent-2 mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Documentation • {activeItem}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-text leading-tight mb-4">
              {activeItem}
            </h1>
            <p className="text-text-2 text-sm md:text-base leading-relaxed">
              Discover how to inject delightful notifications into your software. We make hardware-accelerated layouts, micro-feedbacks, and elastic animations straightforward.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-border-strong bg-white/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text mb-2">High Performance</h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  Leverages Framer Motion physics for zero-layout-shift, GPU-buffered 60fps animations.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border-strong bg-white/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text mb-2">Fully Tailored</h3>
                <p className="text-text-2 text-xs leading-relaxed">
                  Easily inject custom React Nodes, timing parameters, progress gauges, and border shapes.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-[24px] border border-accent/15 bg-gradient-to-tr from-accent/5 to-transparent flex gap-4 items-center">
            <div className="flex-shrink-0">
              <ToastMascot size={70} mood="focused" interactive={true} />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-extrabold text-accent-2 mb-1">Mascot Chef Pro-Tip</h4>
              <p className="text-text-2 text-xs leading-relaxed">
                Ensure you install both <span className="font-bold">react (18.x)</span> and <span className="font-bold">framer-motion</span> as peer dependencies for optimal elastic rendering.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-text tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent" />
              Installation Command
            </h2>
            <p className="text-text-2 text-xs md:text-sm leading-relaxed">
              Add the library file dependencies via npm. Wait for the loading cycle to fully compile.
            </p>
            
            <div className="bg-[#12131a] rounded-2xl p-4 flex items-center justify-between font-mono text-[11px] text-white/90 border border-white/5 select-all">
              <div className="flex items-center gap-2">
                <span className="text-accent">$</span>
                <span>npm install toastyyy</span>
              </div>
              <button 
                onClick={handleCopyInstall}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all select-none"
              >
                {copiedInstall ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-text tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              Quick Application Wrap
            </h2>
            <p className="text-text-2 text-xs md:text-sm leading-relaxed">
              Import the provider and wrap your React root tree context. This sets up the workspace queue globally.
            </p>

            <div className="bg-[#12131a] rounded-2xl overflow-hidden border border-white/5 shadow-xl flex flex-col">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center select-none">
                <span className="text-[9px] font-extrabold text-white/40 tracking-wider uppercase">App.tsx</span>
                <button 
                  onClick={handleCopyQuick}
                  className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  {copiedQuick ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <pre className="p-4 font-mono text-[11px] text-white/80 overflow-x-auto leading-relaxed select-all">
                <code>
                  {`import { ToastProvider } from 'toastyyy'

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  )
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-border-strong select-none">
            <button className="flex items-center gap-1.5 text-xs font-bold text-accent group">
              <ChevronRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
              Prev Section
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-accent group">
              Next Section
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Terminal, 
  Layers, 
  Zap, 
  Settings,
  ExternalLink,
  Code2,
  Copy
} from 'lucide-react'

const sections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Installation', 'Quick Start', 'Styling']
  },
  {
    title: 'Components',
    items: ['Toast Provider', 'Toast Method', 'Custom Toasts', 'React Nodes']
  },
  {
    title: 'Animations',
    items: ['Motion Presets', 'Spring Config', 'Exit Transitions']
  },
  {
    title: 'Advanced',
    items: ['Queue System', 'Accessibility', 'Methods API', 'Hooks']
  }
]

export default function DocsPage() {
  return (
    <div className="flex-1 flex container-wide overflow-hidden min-h-screen">
      {/* Docs Sidebar */}
      <aside className="w-64 border-r border-border hidden lg:flex flex-col py-12 sticky top-20 h-[calc(100vh-80px)]">
        <div className="px-6 mb-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3 group-focus-within:text-brand-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search docs..."
              className="w-full pl-9 pr-4 py-2 bg-surface-2 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-border bg-white text-[9px] font-bold text-text-3">
              ⌘ K
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h4 className="text-[11px] font-bold text-text-3 uppercase tracking-wider mb-4 px-2">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <li key={item}>
                    <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${i === 0 && section.title === 'Getting Started' ? 'bg-brand-50 text-brand-600 font-bold' : 'text-text-2 hover:bg-surface-2 hover:text-text'}`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Docs Content */}
      <main className="flex-1 lg:pl-16 py-12 lg:py-20 max-w-3xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-brand-600 mb-6">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Documentation</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-6">Introduction</h1>
          
          <p className="text-xl text-text-2 mb-12 leading-relaxed">
            Toastyyy is a performance-first, motion-heavy notification library for React. 
            It's designed to give your users clear, beautiful feedback while keeping 
            implementation dangerously simple.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">Built with Motion</h3>
              <p className="text-sm text-text-2 leading-relaxed">Powered by Framer Motion for hardware-accelerated 60fps interactions.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">Fully Accessible</h3>
              <p className="text-sm text-text-2 leading-relaxed">WAI-ARIA compliant out of the box with keyboard navigation and screen reader support.</p>
            </div>
          </div>

          <hr className="border-border mb-16" />

          <section id="installation" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 tracking-tight flex items-center gap-3">
              Installation
              <a href="#installation" className="text-text-3 opacity-0 hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5 rotate-90" /></a>
            </h2>
            <p className="text-text-2 mb-6">Install the package from your favorite package manager.</p>
            
            <div className="bg-slate-900 rounded-xl p-5 mb-12 font-mono text-sm relative group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <code className="text-slate-300">
                <span className="text-brand-400">npm</span> install toastyyy
              </code>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-bold">!</div>
              </div>
              <div>
                <h4 className="text-brand-800 font-bold text-sm mb-1">Requirement</h4>
                <p className="text-brand-700 text-sm leading-relaxed">
                  Toastyyy requires <span className="font-bold">React 18.0.0</span> or later and <span className="font-bold">framer-motion 10.0.0</span> or later.
                </p>
              </div>
            </div>
          </section>

          <section id="quick-start" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Quick Start</h2>
            <p className="text-text-2 mb-8 leading-relaxed">
              To get started, wrap your root application component with the <code className="px-1.5 py-0.5 rounded bg-surface-2 text-brand-600 font-bold text-sm">ToastProvider</code>.
            </p>

            <div className="bg-slate-900 rounded-xl p-6 mb-8 font-mono text-[13px] text-slate-300 shadow-xl">
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-brand-400">import</span> {'{ ToastProvider }'} <span className="text-brand-400">from</span> <span className="text-emerald-400">'toastyyy'</span><br /><br />
                  <span className="text-brand-400">export default function</span> <span className="text-amber-400">App</span>() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-brand-400">return</span> (<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">ToastProvider</span>&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Main</span> /&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-indigo-400">ToastProvider</span>&gt;<br />
                  &nbsp;&nbsp;)<br />
                  {'}'}
                </code>
              </pre>
            </div>

            <p className="text-text-2 mb-8 leading-relaxed">
              Now you can use the <code className="px-1.5 py-0.5 rounded bg-surface-2 text-brand-600 font-bold text-sm">toast</code> hook or object anywhere in your app.
            </p>

            <div className="bg-slate-900 rounded-xl p-6 mb-8 font-mono text-[13px] text-slate-300 shadow-xl">
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-brand-400">import</span> {'{ toast }'} <span className="text-brand-400">from</span> <span className="text-emerald-400">'toastyyy'</span><br /><br />
                  <span className="text-brand-400">function</span> <span className="text-amber-400">MyComponent</span>() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-brand-400">const</span> <span className="text-blue-400">handleClick</span> = () =&gt; {'{'}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">toast</span>.<span className="text-blue-400">success</span>(<span className="text-emerald-400">'Operation successful!'</span>)<br />
                  &nbsp;&nbsp;{'}'}<br /><br />
                  &nbsp;&nbsp;<span className="text-brand-400">return</span> &lt;<span className="text-indigo-400">button</span> <span className="text-amber-400">onClick</span>={'{handleClick}'}&gt;Fire!&lt;/<span className="text-indigo-400">button</span>&gt;<br />
                  {'}'}
                </code>
              </pre>
            </div>
          </section>

          <div className="flex items-center justify-between pt-12 border-t border-border mb-20">
            <button className="flex flex-col items-start gap-1 group">
              <span className="text-[10px] font-bold text-text-3 uppercase tracking-widest">Previous</span>
              <span className="text-brand-600 font-bold group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                <ChevronRight className="w-4 h-4 rotate-180" />
                Introduction
              </span>
            </button>
            <button className="flex flex-col items-end gap-1 group">
              <span className="text-[10px] font-bold text-text-3 uppercase tracking-widest">Next</span>
              <span className="text-brand-600 font-bold group-hover:translate-x-[4px] transition-transform flex items-center gap-1">
                Installation
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Right Sidebar Table of Contents */}
      <aside className="w-64 hidden xl:flex flex-col py-20 sticky top-20 h-[calc(100vh-80px)] px-8">
        <h4 className="text-[11px] font-bold text-text-3 uppercase tracking-wider mb-6">On this page</h4>
        <ul className="space-y-4 border-l border-border">
          {['Overview', 'Performance', 'Accessibility', 'Installation', 'Quick Start'].map((item, i) => (
            <li key={item} className="pl-4">
              <a 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-xs font-medium transition-colors hover:text-brand-600 ${i === 0 ? 'text-brand-600 font-bold' : 'text-text-3'}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto pb-12">
          <div className="p-5 rounded-2xl bg-surface-2 border border-border">
            <h5 className="text-xs font-bold mb-2">Need help?</h5>
            <p className="text-[11px] text-text-3 mb-4 leading-relaxed">Can't find what you're looking for? Join our community on Discord.</p>
            <button className="flex items-center gap-2 text-[11px] font-bold text-brand-600 hover:gap-3 transition-all">
              Chat with us
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

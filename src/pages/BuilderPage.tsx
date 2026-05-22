import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { 
  Settings2, 
  Eye, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  RotateCcw,
  Smartphone,
  Monitor,
  Maximize2
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import Toast, { ToastType } from '../components/ui/Toast'

export default function BuilderPage() {
  const { addToast } = useToasts()
  const [config, setConfig] = useState({
    title: 'Notification Title',
    description: 'This is a description for your custom toast notification.',
    type: 'success' as ToastType,
    duration: 5000,
    showProgress: true,
    animation: 'smooth',
    position: 'bottom-right'
  })
  
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(true)

  const codeSnippet = `import { toast } from 'toastyyy'

// Firing your custom toast
toast.${config.type}('${config.title}', {
  description: '${config.description}',
  duration: ${config.duration},
  showProgress: ${config.showProgress},
  animation: '${config.animation}'
})`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    addToast({
      type: 'success',
      title: 'Copied to clipboard',
      description: 'You can now paste this config into your project.'
    })
  }

  return (
    <div className="flex-1 relative min-h-[calc(100vh-80px)] overflow-hidden bg-bg">
      {/* Background Interactive Canvas (The Live Preview is the whole screen) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 z-0 mesh-bg opacity-50" />
      
      {/* Immersive Controls Panel (Floating Left) */}
      <div className="absolute left-6 top-6 bottom-6 w-80 z-20">
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="h-full glass-dark rounded-[32px] border border-white/10 p-8 flex flex-col gap-8 shadow-2xl overflow-y-auto custom-scrollbar"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-brand">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Toast Builder</h1>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Configuration</p>
            </div>
          </div>

          <section className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 block">Content</label>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70">Title</label>
                  <input 
                    type="text" 
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70">Description</label>
                  <textarea 
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 block">Appearance</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['default', 'success', 'error', 'warning', 'info'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setConfig(prev => ({ ...prev, type: type as ToastType }))}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-bold capitalize transition-all ${config.type === type ? 'bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand/20' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <label className="text-xs font-semibold text-white/70">Show Progress</label>
                <button 
                  onClick={() => setConfig(prev => ({ ...prev, showProgress: !prev.showProgress }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${config.showProgress ? 'bg-brand-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.showProgress ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Duration & Animation</label>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-white/70 mb-1">
                  <span>Duration</span>
                  <span className="text-brand-400">{config.duration}ms</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="500"
                  value={config.duration}
                  onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full accent-brand-500"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">Motion Preset</label>
                <select 
                  value={config.animation}
                  onChange={(e) => setConfig(prev => ({ ...prev, animation: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-all appearance-none"
                >
                  <option value="smooth">Smooth (Default)</option>
                  <option value="bouncy">Bouncy</option>
                  <option value="snappy">Snappy</option>
                  <option value="subtle">Subtle</option>
                </select>
              </div>
            </div>
          </section>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={() => addToast({ ...config })}
              className="btn-primary w-full py-4 text-sm font-bold shadow-2xl shadow-brand/20 group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              Fire Live Toast
            </button>
            <button 
              onClick={() => setConfig({
                title: 'Notification Title',
                description: 'This is a description for your custom toast notification.',
                type: 'success',
                duration: 5000,
                showProgress: true,
                animation: 'smooth',
                position: 'bottom-right'
              })}
              className="flex items-center justify-center gap-2 text-[10px] font-bold text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Config
            </button>
          </div>
        </motion.aside>
      </div>

      {/* Floating Implementation Panel (Move Inside Live Preview Area) */}
      <div className="absolute right-6 bottom-6 z-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`glass-dark rounded-[24px] border border-white/10 shadow-2xl transition-all duration-500 ${showCode ? 'w-[480px] h-[320px]' : 'w-48 h-14'}`}
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-400" />
              <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setShowCode(!showCode)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all"
              >
                <Maximize2 className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {showCode && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[calc(100%-60px)] rounded-b-[24px] overflow-hidden"
              >
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={codeSnippet}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: 'on',
                    readOnly: true,
                    padding: { top: 20, bottom: 20 },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Visual Indicator of the Whole Screen Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="w-24 h-24 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
            <Eye className="w-10 h-10 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">Whole Screen Canvas</h2>
          <p className="text-text-2 max-w-sm mx-auto text-sm leading-relaxed">
            The toasts will fire globally across your entire viewport. 
            Configure on the left, copy the implementation on the bottom right.
          </p>
        </div>
      </div>
    </div>
  )
}


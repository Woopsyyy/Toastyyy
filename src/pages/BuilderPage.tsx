import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { 
  Settings2, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  RotateCcw,
  Sparkles,
  Sliders,
  Terminal,
  Maximize2
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import ToastMascot from '../components/ui/ToastMascot'

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export default function BuilderPage() {
  const { addToast } = useToasts()
  const [config, setConfig] = useState({
    title: 'Gourmet Toast Ready',
    description: 'Crispy edges with a perfect layer of butter.',
    type: 'success' as ToastType,
    duration: 5000,
    showProgress: true,
    animation: 'smooth'
  })
  
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(true)

  const codeSnippet = `import { toast } from 'toastyyy'

toast.${config.type}('${config.title}', {
  description: '${config.description}',
  duration: ${config.duration},
  showProgress: ${config.showProgress},
  animation: '${config.animation}'
})`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    addToast({
      type: 'success',
      title: 'Copied Config!',
      description: 'You can now drop this config directly into your code.'
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFire = () => {
    addToast({
      type: config.type,
      title: config.title,
      description: config.description,
      duration: config.duration,
      showProgress: config.showProgress
    })
  }

  const getMascotMood = () => {
    switch (config.type) {
      case 'success':
        return 'excited'
      case 'error':
        return 'sleepy'
      case 'warning':
        return 'focused'
      case 'info':
      default:
        return 'happy'
    }
  }

  return (
    <div className="flex-1 relative min-h-[calc(100vh-80px)] overflow-hidden bg-bg flex flex-col lg:flex-row">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] grid-pattern" />
      <div className="absolute inset-0 z-0 mesh-bg opacity-40" />

      <div className="w-full lg:w-[380px] z-10 p-6 flex-shrink-0">
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full glass rounded-[32px] border border-accent/10 p-6 flex flex-col gap-6 shadow-xl"
        >
          <div className="flex items-center gap-3 border-b border-border-strong pb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent to-accent-2 flex items-center justify-center text-white shadow-md">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-text">Toast Studio</h1>
              <p className="text-[9px] text-accent-2 font-bold uppercase tracking-wider">Custom Laboratory</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-1.5 scrollbar-thin">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Content Parameters</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-text-2">Title</label>
                  <input 
                    type="text" 
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-text-2">Description</label>
                  <textarea 
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none font-semibold leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Appearance Preset</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['default', 'success', 'error', 'warning', 'info'] as ToastType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setConfig(prev => ({ ...prev, type }))}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-bold capitalize transition-all ${config.type === type ? 'bg-gradient-to-r from-accent to-accent-2 border-transparent text-white shadow-md' : 'bg-white border-border-strong text-text-2 hover:border-accent/40'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-border-strong">
                <span className="text-xs font-bold text-text-2">Show Progress Bar</span>
                <button 
                  onClick={() => setConfig(prev => ({ ...prev, showProgress: !prev.showProgress }))}
                  className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center ${config.showProgress ? 'bg-accent' : 'bg-border-strong'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${config.showProgress ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-2" />
                <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Timing & Transitions</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1 bg-white border border-border-strong p-3.5 rounded-xl">
                  <div className="flex justify-between text-[11px] font-extrabold text-text-2 mb-2">
                    <span>Active Timeout</span>
                    <span className="text-accent-2">{config.duration}ms</span>
                  </div>
                  <input 
                    type="range" 
                    min="1500" 
                    max="8000" 
                    step="500"
                    value={config.duration}
                    onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full accent-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-text-2">Motion Curve Preset</label>
                  <select 
                    value={config.animation}
                    onChange={(e) => setConfig(prev => ({ ...prev, animation: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:border-accent transition-all font-semibold"
                  >
                    <option value="smooth">Smooth Spring</option>
                    <option value="bouncy">Buttery Bouncy</option>
                    <option value="snappy">Crispy Snappy</option>
                    <option value="subtle">Subtle Float</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border-strong pt-4 flex flex-col gap-2.5">
            <button 
              onClick={handleFire}
              className="btn-primary w-full py-4 justify-center shadow-accent text-xs font-black uppercase tracking-wider"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Bake & Fire Toast
            </button>
            <button 
              onClick={() => setConfig({
                title: 'Gourmet Toast Ready',
                description: 'Crispy edges with a perfect layer of butter.',
                type: 'success',
                duration: 5000,
                showProgress: true,
                animation: 'smooth'
              })}
              className="flex items-center justify-center gap-1.5 text-[9px] font-extrabold text-text-3 hover:text-accent-2 transition-colors uppercase tracking-widest py-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Recipe
            </button>
          </div>
        </motion.aside>
      </div>

      <div className="flex-1 p-6 relative flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-12">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-48 h-48 bg-gradient-to-tr from-accent/10 to-purple-500/5 rounded-[40px] border border-accent/15 flex items-center justify-center shadow-inner relative group mb-8">
              <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <ToastMascot size={130} mood={getMascotMood()} interactive={true} />
            </div>
            
            <h2 className="text-xl font-extrabold text-text mb-2 tracking-tight">Active Canvas Preview</h2>
            <p className="text-text-2 text-xs leading-relaxed max-w-xs">
              Every setting you configure triggers instant micro-gestures. Click the mascot to see it squash under spring physics!
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-2xl mx-auto z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`glass rounded-3xl border border-accent/10 shadow-lg overflow-hidden transition-all duration-500 flex flex-col ${showCode ? 'h-[250px]' : 'h-14'}`}
          >
            <div className="px-6 py-4 border-b border-border-strong flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-extrabold text-text-2 tracking-widest uppercase">Exporter Container</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-surface-2 text-text-3 hover:text-accent transition-all"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className="p-1.5 rounded-lg hover:bg-surface-2 text-text-3 hover:text-accent transition-all"
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
                  className="flex-1 min-h-0 bg-[#12131a] relative"
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
                      padding: { top: 16, bottom: 16 },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

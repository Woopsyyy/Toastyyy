import { motion } from 'framer-motion'
import { Sparkles, Terminal, ArrowRight, Zap, Play, Layers, Code2, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { useToasts } from '../hooks/useToasts'

export default function HomePage() {
  const { addToast } = useToasts()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-200/30 orb animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-200/20 orb animate-float-delayed" />
        
        <div className="container-tight relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-brand-200/50 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-semibold text-brand-700 tracking-wide uppercase">
              The Future of Toasts is Here
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-text mb-8 text-balance leading-[1.1]"
          >
            Beautifully <span className="gradient-text">animated</span>, <br />
            dangerously <span className="italic font-serif">simple</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-text-2 mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Toastyyy is a premium React notification system designed for performance, 
            motion, and developer experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button 
              onClick={() => addToast({
                type: 'success',
                title: 'Welcome to Toastyyy!',
                description: 'You just fired your first premium toast animation.',
              })}
              className="btn-primary px-8 py-4 text-base group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl font-mono text-sm shadow-sm group hover:border-brand-300 transition-colors cursor-pointer relative overflow-hidden">
              <Terminal className="w-4 h-4 text-text-3" />
              <span className="text-text-2">npm install toastyyy</span>
              <div className="absolute inset-0 bg-brand-50 opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          </motion.div>

          {/* Hero Interactive Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="glass rounded-3xl p-2 shadow-2xl overflow-hidden group">
              <div className="bg-surface rounded-2xl p-8 lg:p-12 border border-border/50 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-4">Try the experience</h3>
                    <p className="text-text-2 text-sm mb-8 leading-relaxed">
                      Click the buttons to preview different motion presets and notification styles. 
                      Every interaction is GPU-accelerated and butter smooth.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => addToast({ type: 'success', title: 'Action Successful', description: 'Changes saved to the cloud.' })}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-brand-200 hover:bg-brand-50 transition-all text-sm font-medium"
                      >
                        <Zap className="w-4 h-4 text-brand-500" />
                        Success
                      </button>
                      <button 
                        onClick={() => addToast({ type: 'error', title: 'Connection Failed', description: 'Please check your internet settings.' })}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-red-200 hover:bg-red-50 transition-all text-sm font-medium"
                      >
                        <AlertCircle className="w-4 h-4 text-error" />
                        Error
                      </button>
                      <button 
                        onClick={() => addToast({ type: 'info', title: 'System Update', description: 'New features are available now.' })}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-medium"
                      >
                        <Info className="w-4 h-4 text-info" />
                        Info
                      </button>
                      <button 
                        onClick={() => addToast({ type: 'warning', title: 'Low Storage', description: 'You have used 90% of your quota.' })}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-warning/30 hover:bg-warning/10 transition-all text-sm font-medium"
                      >
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        Warning
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Visual representation of a "Playground" */}
                    <div className="aspect-square bg-surface-2 rounded-2xl border border-dashed border-border flex items-center justify-center relative group-hover:border-brand-400 transition-colors">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 animate-float-slow">
                          <Play className="w-8 h-8 text-brand-500 fill-brand-500" />
                        </div>
                        <p className="text-xs font-mono text-text-3">Interactive Canvas</p>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-400" />
                      <div className="absolute top-4 left-9 w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="absolute top-4 left-14 w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorative glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-purple-500/20 rounded-[32px] blur-2xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-white/50 backdrop-blur-sm">
        <div className="container-tight">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Built for elite developers</h2>
            <p className="text-text-2 max-w-xl mx-auto">
              We've obsessed over every frame and pixel so you don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: 'High Performance', 
                desc: '60fps animations using GPU-accelerated transforms for zero layout shift.' 
              },
              { 
                icon: <Layers className="w-6 h-6" />, 
                title: 'Flexible API', 
                desc: 'Fully customizable types, positions, and durations with a tiny footprint.' 
              },
              { 
                icon: <Code2 className="w-6 h-6" />, 
                title: 'Type Safe', 
                desc: 'First-class TypeScript support with full intellisense for all your options.' 
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-border bg-surface hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-text-2 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Installation Snippet */}
      <section className="section container-tight">
        <div className="glass rounded-[32px] p-8 lg:p-12 relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Start building in seconds</h2>
              <p className="text-text-2 mb-8 leading-relaxed">
                Integration is as simple as adding a provider. Zero configuration required to get started with our premium presets.
              </p>
              <div className="flex gap-4">
                <button className="btn-primary">Read Documentation</button>
                <button className="btn-ghost">View Source</button>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[13px] text-slate-300 shadow-2xl relative">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-brand-400">import</span> {'{ ToastProvider, toast }'} <span className="text-brand-400">from</span> <span className="text-emerald-400">'toastyyy'</span><br /><br />
                  <span className="text-slate-500">// Wrap your app</span><br />
                  <span className="text-brand-400">function</span> <span className="text-amber-400">App</span>() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-brand-400">return</span> (<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">ToastProvider</span>&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Main</span> /&gt;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-indigo-400">ToastProvider</span>&gt;<br />
                  &nbsp;&nbsp;)<br />
                  {'}'}<br /><br />
                  <span className="text-slate-500">// Fire away</span><br />
                  <span className="text-amber-400">toast</span>.<span className="text-blue-400">success</span>(<span className="text-emerald-400">'Premium toast fired!'</span>)
                </code>
              </pre>
            </div>
          </div>
          
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] z-0" />
        </div>
      </section>
    </div>
  )
}


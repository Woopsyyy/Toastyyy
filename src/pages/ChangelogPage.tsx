import { motion } from 'framer-motion'
import { 
  History, 
  GitBranch, 
  Tag, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Bug,
  Sparkles,
  ExternalLink
} from 'lucide-react'

const releases = [
  {
    version: '2.4.0',
    date: 'May 12, 2024',
    type: 'Major',
    title: 'The Motion Update',
    description: 'A complete overhaul of the animation system, introducing spring-based physics and GPU-accelerated transforms.',
    features: [
      { icon: <Zap className="w-4 h-4 text-brand-500" />, label: 'Spring-based animation presets (smooth, bouncy, snappy)' },
      { icon: <Sparkles className="w-4 h-4 text-amber-500" />, label: 'Introduction of the Interactive Toast Builder' },
      { icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, label: 'Full WAI-ARIA compliance for all toast components' }
    ],
    fixes: ['Resolved issue with toast stacking on mobile devices', 'Fixed memory leak in the progress bar cleanup']
  },
  {
    version: '2.3.4',
    date: 'April 28, 2024',
    type: 'Patch',
    title: 'Performance Patch',
    description: 'Minor optimizations to the rendering loop to ensure consistent 60fps on low-end devices.',
    features: [
      { icon: <Tag className="w-4 h-4 text-blue-500" />, label: 'New "pill" style variant for minimalist designs' }
    ],
    fixes: ['Improved accessibility for screen readers on success toasts']
  },
  {
    version: '2.3.0',
    date: 'April 15, 2024',
    type: 'Minor',
    title: 'Context API Integration',
    description: 'Introducing a more robust ToastProvider with better context handling and state management.',
    features: [
      { icon: <GitBranch className="w-4 h-4 text-purple-500" />, label: 'New useToasts hook for simplified integration' },
      { icon: <Zap className="w-4 h-4 text-brand-500" />, label: 'Support for React 18 Concurrent Mode' }
    ],
    fixes: []
  }
]

export default function ChangelogPage() {
  return (
    <div className="container-tight py-20 px-6">
      <div className="max-w-2xl mb-20">
        <div className="flex items-center gap-2 text-brand-600 mb-6">
          <History className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Changelog</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-6">Latest Updates</h1>
        
        <p className="text-xl text-text-2 leading-relaxed">
          Stay up to date with the latest features, improvements, and fixes we've brought to Toastyyy.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />

        <div className="space-y-24">
          {releases.map((release, i) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 lg:left-1/2 top-0 lg:-translate-x-1/2 flex flex-col items-center z-10 bg-bg py-2">
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-brand-500 shadow-lg shadow-brand/40' : 'bg-border'}`} />
                <div className="text-[10px] font-bold text-text-3 mt-3 absolute top-6 whitespace-nowrap hidden lg:block">
                  {release.date}
                </div>
              </div>

              {/* Release Content */}
              <div className="w-full lg:w-1/2">
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} pl-8 lg:pl-0`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-widest border border-brand-100">
                      {release.type}
                    </span>
                    <span className="text-sm font-bold text-text-3 font-mono">{release.version}</span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight">{release.title}</h2>
                  <p className="text-text-2 text-sm leading-relaxed mb-6 max-w-lg">
                    {release.description}
                  </p>

                  <div className="p-1 rounded-xl bg-surface border border-border shadow-sm group hover:border-brand-200 transition-colors w-full lg:w-fit">
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-2 hover:text-brand-600 transition-colors">
                      Full Release Notes
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Release Details (Features/Fixes) */}
              <div className="w-full lg:w-1/2 pl-8 lg:pl-0">
                <div className="glass rounded-2xl p-8 border-border/50 relative spotlight overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-[11px] font-bold text-text-3 uppercase tracking-wider mb-6">Key Changes</h4>
                    
                    <ul className="space-y-4 mb-8">
                      {release.features.map((feature, j) => (
                        <li key={j} className="flex gap-4">
                          <div className="flex-shrink-0 mt-0.5">{feature.icon}</div>
                          <span className="text-sm text-text-2 leading-tight font-medium">{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    {release.fixes.length > 0 && (
                      <div className="pt-6 border-t border-border/50">
                        <h5 className="text-[10px] font-bold text-text-3 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Bug className="w-3 h-3 text-red-400" />
                          Fixes
                        </h5>
                        <ul className="space-y-2">
                          {release.fixes.map((fix, j) => (
                            <li key={j} className="text-[13px] text-text-2 flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-text-3 mt-2 flex-shrink-0" />
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-32 p-12 lg:p-20 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-xl">
            <Sparkles className="w-8 h-8 text-brand-400" />
          </div>
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Stay in the loop</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Get notified about new components, animation presets, and security updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
            />
            <button className="btn-primary px-8 py-4 shadow-xl shadow-brand/20">Subscribe</button>
          </div>
          <p className="mt-6 text-[11px] text-slate-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  )
}

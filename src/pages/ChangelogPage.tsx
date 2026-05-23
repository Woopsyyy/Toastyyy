import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  History, 
  GitBranch, 
  Tag, 
  Zap, 
  ShieldCheck, 
  Bug,
  Sparkles,
  ArrowUpRight,
  Mail,
  Check
} from 'lucide-react'
import ToastMascot from '../components/ui/ToastMascot'
import { useToasts } from '../hooks/useToasts'

const changelogReleases = [
  {
    version: '1.2.0',
    date: 'May 23, 2026',
    type: 'Feature Release',
    title: 'The Unified Canvas Update',
    description: 'Consolidating the gourmet lab into a continuous single-page scrolling experience, removing favorites database dependencies, and integrating the visual customizer directly beside the recipes grid.',
    features: [
      { icon: <Zap className="w-4 h-4 text-accent" />, label: 'Consolidated Builder and Docs into a high-performance single-page scroll layout' },
      { icon: <Sparkles className="w-4 h-4 text-accent" />, label: 'Embedded the Visual Customizer directly side-by-side with preset cards grid' },
      { icon: <ShieldCheck className="w-4 h-4 text-accent" />, label: 'Removed Favorites feature to align with database-free architecture' }
    ],
    fixes: ['Corrected responsive layout overlap on viewports under 1024px', 'Fixed anchor jump alignment shifting']
  },
  {
    version: '1.1.0',
    date: 'May 22, 2026',
    type: 'Feature Release',
    title: 'The Core Variants Update',
    description: 'Adding premium loading and promise toast variants to the global notification queue, complete with custom animations.',
    features: [
      { icon: <Zap className="w-4 h-4 text-accent" />, label: 'New "loading" toast variant with high-fidelity animated spinner' },
      { icon: <Sparkles className="w-4 h-4 text-accent" />, label: 'New "promise" toast variant with custom pulse motion' },
      { icon: <ShieldCheck className="w-4 h-4 text-accent" />, label: 'Bumped NPM library package target to v1.1.0' }
    ],
    fixes: ['Synchronized state queue parameters across custom layouts']
  },
  {
    version: '1.0.0',
    date: 'May 22, 2026',
    type: 'Major',
    title: 'The Mascot Redesign',
    description: 'A complete aesthetic redesign. Introducing the hand-crafted interactive Toast Mascot, spring physics, and gourmet UI presets.',
    features: [
      { icon: <Zap className="w-4 h-4 text-accent" />, label: 'Spring-driven active Mascot (with gaze tracking and hover squash)' },
      { icon: <Sparkles className="w-4 h-4 text-accent" />, label: 'Complete creative lab visual overhaul (soft cream-glass theme)' },
      { icon: <ShieldCheck className="w-4 h-4 text-accent" />, label: 'Hardened monorepo security setup and zero-comment compliance' }
    ],
    fixes: ['Resolved fluid alignment shifts on high DPI viewports', 'Removed legacy style class clutter']
  },
  {
    version: '0.9.4',
    date: 'May 10, 2026',
    type: 'Minor',
    title: 'Elastic collision algorithms',
    description: 'Tuned notification boundary collision parameters for seamless visual stacking and overlays.',
    features: [
      { icon: <Tag className="w-4 h-4 text-accent" />, label: 'Gourmet flavor preset variables (Strawberry Jam, Burnt Garlic)' }
    ],
    fixes: ['Fixed event trigger propagation on exit animations']
  },
  {
    version: '0.9.0',
    date: 'April 20, 2026',
    type: 'Pre-Release',
    title: 'Core Engine Alpha',
    description: 'Initial architectural framework introducing the centralized ToastProvider context queue.',
    features: [
      { icon: <GitBranch className="w-4 h-4 text-accent" />, label: 'Core global useToasts queue engine' }
    ],
    fixes: []
  }
]

export default function ChangelogPage() {
  const { addToast } = useToasts()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    addToast({
      type: 'success',
      title: 'Subscribed Successfully!',
      description: 'You will receive monthly gourmet updates in your inbox.'
    })
    setEmail('')
  }

  return (
    <div className="container-tight py-16 px-6 relative z-10">
      <div className="max-w-2xl mb-20 text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
        >
          <History className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-extrabold text-accent-2 tracking-widest uppercase">Changelog Feed</span>
        </motion.div>
        
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-4">Latest Recipes</h1>
        <p className="text-text-2 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Trace the evolutionary path of the Toastyyy ecosystem. Discover new features, optimization notes, and patch logs.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[1.5px] bg-border-strong lg:-translate-x-1/2" />

        <div className="space-y-20">
          {changelogReleases.map((release, i) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 lg:gap-16`}
            >
              <div className="absolute left-4 lg:left-1/2 top-4 lg:-translate-x-1/2 flex flex-col items-center z-10 bg-bg py-2">
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ${i === 0 ? 'bg-accent shadow-md' : 'bg-text-3'}`} />
                <span className="text-[9px] font-extrabold text-text-3 mt-4 absolute top-4 whitespace-nowrap hidden lg:block select-none">
                  {release.date}
                </span>
              </div>

              <div className="w-full lg:w-1/2 pl-12 lg:pl-0 flex flex-col justify-center">
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/20 text-[9px] font-extrabold text-accent-2 uppercase tracking-widest">
                      {release.type}
                    </span>
                    <span className="text-xs font-extrabold text-text-3 font-mono">{release.version}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-extrabold mb-3 tracking-tight text-text">{release.title}</h2>
                  <p className="text-text-2 text-xs md:text-sm leading-relaxed max-w-md">
                    {release.description}
                  </p>
                  
                  <span className="text-[10px] font-extrabold text-text-3 mt-1 block select-none lg:hidden">{release.date}</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 pl-12 lg:pl-0">
                <div className="glass rounded-[28px] p-6 border-accent/10 relative overflow-hidden shadow-md">
                  <div className="relative z-10">
                    <h4 className="text-[9px] font-extrabold text-text-3 uppercase tracking-widest mb-4">Gourmet Changes</h4>
                    
                    <ul className="space-y-3.5 mb-6">
                      {release.features.map((feature, j) => (
                        <li key={j} className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">{feature.icon}</div>
                          <span className="text-xs text-text-2 leading-relaxed font-semibold">{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    {release.fixes.length > 0 && (
                      <div className="pt-5 border-t border-border-strong">
                        <h5 className="text-[9px] font-extrabold text-text-3 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                          <Bug className="w-3.5 h-3.5 text-accent" />
                          Fixes & Patches
                        </h5>
                        <ul className="space-y-2">
                          {release.fixes.map((fix, j) => (
                            <li key={j} className="text-xs text-text-2 flex items-start gap-2 font-semibold">
                              <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
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

      <section className="mt-28 glass rounded-[36px] p-8 lg:p-12 border-accent/15 relative overflow-hidden shadow-xl">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[80px]" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-6 items-center">
            <div className="flex-shrink-0 hidden sm:block">
              <ToastMascot size={100} mood="happy" interactive={true} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-text mb-3">
                Stay updated
              </h2>
              <p className="text-text-2 text-xs md:text-sm leading-relaxed max-w-sm">
                Get monthly recipes, gooey presets, performance patches, and updates delivered straight to your workbench.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chef@workspace.com" 
              className="flex-1 px-5 py-4 rounded-2xl bg-white border border-border-strong text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="btn-primary justify-center shadow-accent text-xs font-black uppercase tracking-wider px-8"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

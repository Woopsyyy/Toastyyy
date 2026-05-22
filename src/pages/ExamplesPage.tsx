import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  ExternalLink, 
  Code,
  Layout as LayoutIcon,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Sparkles,
  Download,
  Zap,
  Globe,
  DollarSign
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import ToastMascot from '../components/ui/ToastMascot'

type Category = 'All' | 'Status' | 'Transactional' | 'System'

export default function ExamplesPage() {
  const { addToast } = useToasts()
  
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({})

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
    
    if (!likedCards[id]) {
      addToast?.({
        type: 'default',
        title: 'Added to Favorites!',
        description: 'Thank you for supporting this recipe template.'
      })
    }
  }

  const examples = [
    {
      id: 1,
      title: 'Cloud Core Sync',
      category: 'Status',
      desc: 'Seamless confirmation when code compilation and sync is complete.',
      tags: ['Compiler', '60fps'],
      likes: 312,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => addToast?.({
        type: 'success',
        title: 'Deployment Complete',
        description: 'Your production bundle is now live globally in 45ms.',
        showProgress: true
      })
    },
    {
      id: 2,
      title: 'Shield Core Warning',
      category: 'System',
      desc: 'High importance alerts highlighting security tokens and status.',
      tags: ['Security', 'Vulnerability'],
      likes: 184,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
      action: () => addToast?.({
        type: 'warning',
        title: 'Key Rotation Required',
        description: 'Your API Access keys will expire in less than 60 seconds.',
        showProgress: true
      })
    },
    {
      id: 3,
      title: 'Gourmet Stripe Slice',
      category: 'Transactional',
      desc: 'A premium transactional feedback card confirming subscription payouts.',
      tags: ['SaaS', 'Stripe'],
      likes: 410,
      icon: <DollarSign className="w-5 h-5 text-indigo-500" />,
      color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500',
      action: () => addToast?.({
        type: 'success',
        title: 'Invoice Paid • $240.00',
        description: 'Enterprise account upgraded. Receipt dispatched to billing.',
        showProgress: true
      })
    },
    {
      id: 4,
      title: 'Global Traffic Surge',
      category: 'System',
      desc: 'System monitoring alerts indicating request spikes and thresholds.',
      tags: ['Telemetry', 'Alert'],
      likes: 95,
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      action: () => addToast?.({
        type: 'info',
        title: 'Bandwidth Spike',
        description: 'CDN request volumes increased by 230% in cluster-04.',
        showProgress: true
      })
    },
    {
      id: 5,
      title: 'Inbox Dispatch',
      category: 'Status',
      desc: 'Interactive chat alerts featuring avatars and dynamic messaging.',
      tags: ['Social', 'Bubble'],
      likes: 277,
      icon: <MessageSquare className="w-5 h-5 text-[#ff8c3b]" />,
      color: 'bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]',
      action: () => addToast?.({
        type: 'default',
        title: 'Message from Josh',
        description: '"Hey! The new gooey curves look spectacular on production!"',
        showProgress: true
      })
    },
    {
      id: 6,
      title: 'Hardware Failure',
      category: 'System',
      desc: 'Critical hardware warnings capturing database and memory exhaustion.',
      tags: ['Urgent', 'Recovery'],
      likes: 154,
      icon: <Zap className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => addToast?.({
        type: 'error',
        title: 'Database Overloaded',
        description: 'Postgres execution thread pool exhausted (99% capacity).',
        showProgress: true
      })
    }
  ]

  const filteredExamples = activeCategory === 'All' 
    ? examples 
    : examples.filter(item => item.category === activeCategory)

  return (
    <div className="container-tight py-16 px-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
              <LayoutIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-accent-2 uppercase tracking-widest">Showcase Recipes</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-4"
          >
            Interactive <span className="gradient-text-warm font-black">Examples</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-2 text-sm md:text-base leading-relaxed"
          >
            Discover beautiful preset configurations. Click any card to preview its real-time spring animation and toast layout.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex bg-white rounded-2xl border border-border-strong p-1 shadow-sm select-none"
        >
          {(['All', 'Status', 'Transactional', 'System'] as Category[]).map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all relative ${activeCategory === cat ? 'bg-accent text-white shadow-sm' : 'text-text-3 hover:text-text-2'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredExamples.map((example, i) => {
            const isLiked = !!likedCards[example.id]
            return (
              <motion.div
                key={example.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={example.action}
                className="glass rounded-[28px] border border-accent/10 hover:border-accent/30 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-accent-2 bg-accent/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {example.category}
                    </span>
                    <button 
                      onClick={(e) => toggleLike(example.id, e)}
                      className="w-8 h-8 rounded-full bg-white border border-border-strong flex items-center justify-center hover:scale-110 transition-transform shadow-sm group/heart"
                    >
                      <Heart className={`w-3.5 h-3.5 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-text-3 group-hover/heart:text-red-400'}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${example.color} border shadow-inner`}>
                      {example.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-text">{example.title}</h3>
                      <p className="text-[10px] font-bold text-text-3 uppercase tracking-wider mt-0.5">Template #{example.id}00</p>
                    </div>
                  </div>

                  <p className="text-text-2 text-xs leading-relaxed mt-2">
                    {example.desc}
                  </p>
                </div>

                <div className="px-5 py-4 border-t border-border-strong flex items-center justify-between bg-white/40">
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white border border-border-strong text-[9px] font-extrabold text-text-2 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-extrabold text-accent-2 flex items-center gap-1 hover:gap-1.5 transition-all">
                    Test Live
                    <Code className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-20 border-t border-border-strong pt-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-accent/15 to-transparent rounded-full flex items-center justify-center mb-6">
          <ToastMascot size={56} mood="excited" interactive={true} />
        </div>
        <h3 className="text-lg font-extrabold text-text mb-2">Build Your Own Custom Flavor</h3>
        <p className="text-text-2 text-xs md:text-sm max-w-sm mb-6 leading-relaxed">
          Need a custom spring profile or personalized color variables? Jump into our visual editor studio.
        </p>
        <button 
          onClick={() => window.location.href = '/builder'}
          className="btn-ghost text-xs font-black uppercase tracking-wider px-8 shadow-sm"
        >
          Launch Toast Studio
        </button>
      </div>
    </div>
  )
}

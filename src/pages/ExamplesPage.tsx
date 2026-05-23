import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
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
  Clock,
  Settings,
  ShieldAlert,
  Play,
  Wind,
  Loader2
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import ToastMascot from '../components/ui/ToastMascot'

type Category = 'All' | 'Basics' | 'Layouts' | 'Advanced' | 'Easing' | 'Promises'

export default function ExamplesPage() {
  const { addToast, updateToast } = useToasts()
  
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({})

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
    
    if (!likedCards[id]) {
      addToast({
        type: 'default',
        title: 'Added to Favorites!',
        description: 'Thank you for supporting this recipe template.'
      })
    }
  }

  const examples = [
    {
      id: 1,
      title: 'Default Toast',
      category: 'Basics',
      desc: 'Standard neutral alert profile ideal for generic telemetry updates.',
      tags: ['Default', 'Basics'],
      likes: 120,
      icon: <Bell className="w-5 h-5 text-text-3" />,
      color: 'bg-surface-2 border-border-strong text-text-2',
      action: () => addToast({
        type: 'default',
        title: 'System Dispatch Active'
      })
    },
    {
      id: 2,
      title: 'Success Toast',
      category: 'Basics',
      desc: 'Vibrant green confirmation layout triggered upon complete operations.',
      tags: ['Success', 'Basics'],
      likes: 310,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => addToast({
        type: 'success',
        title: 'Golden Butter Toast Ready'
      })
    },
    {
      id: 3,
      title: 'Error Toast',
      category: 'Basics',
      desc: 'Critical red warning template capturing database or system failure logs.',
      tags: ['Error', 'Basics'],
      likes: 242,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => addToast({
        type: 'error',
        title: 'Burnt Toast Alert'
      })
    },
    {
      id: 4,
      title: 'Warning Toast',
      category: 'Basics',
      desc: 'Vibrant orange layout signaling high internal temperatures.',
      tags: ['Warning', 'Basics'],
      likes: 184,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
      action: () => addToast({
        type: 'warning',
        title: 'Oven Temperature Limit Reached'
      })
    },
    {
      id: 5,
      title: 'Info Toast',
      category: 'Basics',
      desc: 'Informative blue styling card presenting chef suggestions.',
      tags: ['Info', 'Basics'],
      likes: 195,
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      action: () => addToast({
        type: 'info',
        title: 'Chef Recommendation Active'
      })
    },
    {
      id: 6,
      title: 'With Description',
      category: 'Layouts',
      desc: 'A default notification enhanced with description layouts.',
      tags: ['Description', 'Pill'],
      likes: 204,
      icon: <MessageSquare className="w-5 h-5 text-[#ff8c3b]" />,
      color: 'bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]',
      action: () => addToast({
        type: 'default',
        title: 'Gourmet Selection',
        description: 'Freshly baked sourdough slice with cream cheese.',
        showDescription: true
      })
    },
    {
      id: 7,
      title: 'Warning + Description',
      category: 'Layouts',
      desc: 'Warning layout displaying telemetry descriptions.',
      tags: ['Warning', 'Details'],
      likes: 154,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
      action: () => addToast({
        type: 'warning',
        title: 'Internal Temperature Warning',
        description: 'Thermostat exceeds 450 degrees in bake-chamber-02.',
        showDescription: true
      })
    },
    {
      id: 8,
      title: 'Error + Description',
      category: 'Layouts',
      desc: 'Error layout displaying details for crash debugging.',
      tags: ['Error', 'Telemetry'],
      likes: 298,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => addToast({
        type: 'error',
        title: 'Baking Cycle Failed',
        description: 'Connection lost with internal thermostat nodes.',
        showDescription: true
      })
    },
    {
      id: 9,
      title: 'With Action Button',
      category: 'Layouts',
      desc: 'Standard neutral alert with an action button preset.',
      tags: ['Action', 'Interactive'],
      likes: 312,
      icon: <Settings className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      action: () => addToast({
        type: 'default',
        title: 'Telemetry Node Synced',
        showAction: true,
        actionText: 'View Logs'
      })
    },
    {
      id: 10,
      title: 'Error + Action',
      category: 'Layouts',
      desc: 'Red alert including retry actions.',
      tags: ['Error', 'Retry'],
      likes: 211,
      icon: <Zap className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => addToast({
        type: 'error',
        title: 'Connection Timed Out',
        description: 'Retry compiling active modules.',
        showDescription: true,
        showAction: true,
        actionText: 'Retry Compile'
      })
    },
    {
      id: 11,
      title: 'Action + Success Pill',
      category: 'Layouts',
      desc: 'Success pill mapping low bounce spring layouts.',
      tags: ['Pill', 'Elastic'],
      likes: 342,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => addToast({
        type: 'success',
        title: 'Sourdough Sliced Successfully',
        showAction: true,
        actionText: 'Spread Butter',
        bounce: 0.15
      })
    },
    {
      id: 12,
      title: 'Custom Component Body',
      category: 'Advanced',
      desc: 'Renders custom HTML layouts inside the toast card.',
      tags: ['Dynamic', 'ReactNode'],
      likes: 412,
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500',
      action: () => addToast({
        type: 'default',
        title: 'Upgrade Plan Success',
        showDescription: true,
        description: 'Upgraded to Gourmet Tier. Direct receipt sent to billing.',
        customColor: '#e06c1f'
      })
    },
    {
      id: 13,
      title: 'ReactNode Description',
      category: 'Advanced',
      desc: 'Description body rendered as complex inline text strings.',
      tags: ['ReactNode', 'Render'],
      likes: 289,
      icon: <Clock className="w-5 h-5 text-[#ff8c3b]" />,
      color: 'bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]',
      action: () => addToast({
        type: 'info',
        title: 'Server Active',
        showDescription: true,
        description: 'Cluster-04 is running at 98% efficiency.'
      })
    },
    {
      id: 14,
      title: 'No Spring (Smooth)',
      category: 'Easing',
      desc: 'Fires slides smoothly with zero bounce coefficients.',
      tags: ['Easing', 'Linear'],
      likes: 198,
      icon: <Wind className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      action: () => addToast({
        type: 'default',
        title: 'Smooth Slide Active',
        description: 'Fired with no spring physics.',
        showDescription: true,
        bounce: 0.00
      })
    },
    {
      id: 15,
      title: 'Success (no spring)',
      category: 'Easing',
      desc: 'Success layout transitions smoothly with zero bounce.',
      tags: ['Success', 'No-Spring'],
      likes: 150,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => addToast({
        type: 'success',
        title: 'Files Saved in Workspace',
        bounce: 0.00
      })
    },
    {
      id: 16,
      title: 'Error + Desc (no spring)',
      category: 'Easing',
      desc: 'Error warnings displaying logs using linear transitions.',
      tags: ['Error', 'Easing'],
      likes: 132,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => addToast({
        type: 'error',
        title: 'Hardware Failure Registered',
        description: 'Critical crash handled with no spring.',
        showDescription: true,
        bounce: 0.00
      })
    },
    {
      id: 17,
      title: 'Action (no spring)',
      category: 'Easing',
      desc: 'Action layout using linear smooth sliding transitions.',
      tags: ['Action', 'Linear'],
      likes: 121,
      icon: <Zap className="w-5 h-5 text-text-3" />,
      color: 'bg-surface-2 border-border-strong text-text-2',
      action: () => addToast({
        type: 'warning',
        title: 'Database Overcapacity',
        description: 'Fired with no spring.',
        showDescription: true,
        showAction: true,
        actionText: 'Rollback',
        bounce: 0.00
      })
    },
    {
      id: 18,
      title: 'Promise (Morph Animation)',
      category: 'Promises',
      desc: 'Programmatic loader updating loading to success in 2 seconds.',
      tags: ['Loader', 'Morph'],
      likes: 541,
      icon: <Loader2 className="w-5 h-5 text-accent animate-spin" />,
      color: 'bg-accent/10 border-accent/20 text-accent',
      action: () => {
        const id = addToast({
          type: 'loading',
          title: 'Fetching gourmet assets...',
          showProgress: true,
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'success',
            title: 'Assets Fetched Successfully',
            description: 'Loaded 4 files in 240ms.',
            showDescription: true
          })
        }, 2000)
      }
    },
    {
      id: 19,
      title: 'Promise + Success (pill)',
      category: 'Promises',
      desc: 'Resolves loading into compact success pills in 2 seconds.',
      tags: ['Pill', 'Update'],
      likes: 312,
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => {
        const id = addToast({
          type: 'loading',
          title: 'Bundling modules...',
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'success',
            title: 'Code Bundled!',
            bounce: 0.15
          })
        }, 2000)
      }
    },
    {
      id: 20,
      title: 'Promise + Error (pill)',
      category: 'Promises',
      desc: 'Resolves loading into compact error alerts in 2 seconds.',
      tags: ['Pill', 'Error'],
      likes: 219,
      icon: <Sparkles className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => {
        const id = addToast({
          type: 'loading',
          title: 'Deploying tunnel...',
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'error',
            title: 'Deployment Failed!',
            bounce: 0.15
          })
        }, 2000)
      }
    },
    {
      id: 21,
      title: 'Promise + Error (expanded)',
      category: 'Promises',
      desc: 'Resolves loading into detailed error descriptions.',
      tags: ['Error', 'Expanded'],
      likes: 209,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10 border-red-500/20 text-red-500',
      action: () => {
        const id = addToast({
          type: 'loading',
          title: 'Resolving DNS records...',
          description: 'Contacting server...',
          showDescription: true,
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'error',
            title: 'DNS Resolution Failed',
            description: 'Network timeout connecting to public registry.',
            showDescription: true
          })
        }, 2500)
      }
    },
    {
      id: 22,
      title: 'Promise + Success (expanded)',
      category: 'Promises',
      desc: 'Resolves loading into detailed success descriptions.',
      tags: ['Success', 'Expanded'],
      likes: 422,
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => {
        const id = addToast({
          type: 'loading',
          title: 'Syncing user workspace...',
          description: 'Uploading details...',
          showDescription: true,
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'success',
            title: 'Workspace Fully Synced',
            description: 'All 12 modified files updated successfully.',
            showDescription: true
          })
        }, 2500)
      }
    },
    {
      id: 23,
      title: 'Update Toast Content',
      category: 'Promises',
      desc: 'Fires an informative alert, and updates its text contents.',
      tags: ['Update', 'Content'],
      likes: 278,
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      action: () => {
        const id = addToast({
          type: 'info',
          title: 'Verifying user credentials...',
          description: 'Connecting to database auth servers...',
          showDescription: true,
          duration: 8000
        })
        setTimeout(() => {
          updateToast(id, {
            type: 'success',
            title: 'Credentials Verified',
            description: 'Access granted. Welcome back, Chef!',
            showDescription: true
          })
        }, 2000)
      }
    },
    {
      id: 24,
      title: 'Linear Progress Bar',
      category: 'Advanced',
      desc: 'Fires a success confirmation card with progress bars active.',
      tags: ['Progress', 'Timer'],
      likes: 311,
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      action: () => addToast({
        type: 'success',
        title: 'Automatic Backup Complete',
        description: 'Review updates in settings.',
        showDescription: true,
        showProgress: true
      })
    },
    {
      id: 25,
      title: 'Gourmet Callbacks',
      category: 'Advanced',
      desc: 'Fires callbacks popping custom alert confirmation dialogs.',
      tags: ['Callbacks', 'Events'],
      likes: 189,
      icon: <Download className="w-5 h-5 text-[#ff8c3b]" />,
      color: 'bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]',
      action: () => addToast({
        type: 'default',
        title: 'Action Triggered Callback',
        description: 'Click below to dispatch target events.',
        showDescription: true,
        showAction: true,
        actionText: 'Execute Callback',
        customColor: '#ff8c3b'
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
          className="flex flex-wrap bg-white rounded-2xl border border-border-strong p-1 shadow-sm select-none gap-1"
        >
          {(['All', 'Basics', 'Layouts', 'Advanced', 'Easing', 'Promises'] as Category[]).map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all relative ${activeCategory === cat ? 'bg-accent text-white shadow-sm' : 'text-text-3 hover:text-text-2'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                transition={{ duration: 0.5, delay: i * 0.02 }}
                whileHover={{ y: -4 }}
                onClick={example.action}
                className="glass rounded-[24px] border border-accent/10 hover:border-accent/30 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-extrabold text-accent-2 bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                      {example.category}
                    </span>
                    <button 
                      onClick={(e) => toggleLike(example.id, e)}
                      className="w-7 h-7 rounded-full bg-white border border-border-strong flex items-center justify-center hover:scale-110 transition-transform shadow-sm group/heart"
                    >
                      <Heart className={`w-3 h-3 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-text-3 group-hover/heart:text-red-400'}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${example.color} border shadow-inner`}>
                      {example.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-text leading-tight">{example.title}</h3>
                      <p className="text-[9px] font-bold text-text-3 uppercase tracking-wider mt-0.5 select-none">Preset #{example.id}00</p>
                    </div>
                  </div>

                  <p className="text-text-2 text-[11px] leading-relaxed">
                    {example.desc}
                  </p>
                </div>

                <div className="px-5 py-3 border-t border-border-strong flex items-center justify-between bg-white/40">
                  <div className="flex flex-wrap gap-1">
                    {example.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-white border border-border-strong text-[8px] font-extrabold text-text-2 tracking-wider uppercase select-none">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[9px] font-extrabold text-accent-2 flex items-center gap-1 hover:gap-1.5 transition-all select-none">
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

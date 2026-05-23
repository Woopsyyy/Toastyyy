import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Editor from '@monaco-editor/react'
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
  Loader2,
  X,
  Sliders,
  Palette,
  Compass,
  Eye,
  Maximize2,
  RotateCcw,
  Settings2,
  Code2,
  Check,
  Copy
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'
import ToastMascot from '../components/ui/ToastMascot'

type Category = 'All' | 'Basics' | 'Layouts' | 'Advanced' | 'Easing' | 'Promises'
type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading' | 'promise'
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export default function ExamplesPage() {
  const { addToast, updateToast } = useToasts()
  const location = useLocation()
  
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({})
  const [activeCardId, setActiveCardId] = useState<number | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showCode, setShowCode] = useState(true)
  const [copied, setCopied] = useState(false)

  const [config, setConfig] = useState({
    title: 'Gourmet Toast Ready',
    description: 'Crispy edges with a perfect layer of butter.',
    showDescription: true,
    showAction: false,
    actionText: 'Undo',
    customColor: '#ff8c3b',
    hasBorder: true,
    bounce: 0.40,
    theme: 'light' as 'light' | 'dark',
    showProgress: true,
    closeOnEscape: false,
    showTimestamp: false,
    showCloseButton: true,
    position: 'bottom-right' as ToastPosition,
    type: 'success' as ToastType
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('builder') === 'true' || location.pathname === '/builder') {
      setIsDrawerOpen(true)
    }
  }, [location])

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

  const handleCardClick = (example: any) => {
    setActiveCardId(example.id)
    setIsDrawerOpen(true)
    setConfig({
      title: example.builderConfig.title,
      description: example.builderConfig.description || '',
      showDescription: example.builderConfig.showDescription,
      showAction: example.builderConfig.showAction,
      actionText: example.builderConfig.actionText || 'Undo',
      customColor: example.builderConfig.customColor || '#ff8c3b',
      hasBorder: example.builderConfig.hasBorder ?? true,
      bounce: example.builderConfig.bounce ?? 0.40,
      theme: example.builderConfig.theme || 'light',
      showProgress: example.builderConfig.showProgress ?? true,
      closeOnEscape: example.builderConfig.closeOnEscape ?? false,
      showTimestamp: example.builderConfig.showTimestamp ?? false,
      showCloseButton: example.builderConfig.showCloseButton ?? true,
      position: example.builderConfig.position || 'bottom-right',
      type: example.builderConfig.type || 'default'
    })
  }

  const handleFire = () => {
    if (config.type === 'loading' || activeCardId === 18 || activeCardId === 19 || activeCardId === 20 || activeCardId === 21 || activeCardId === 22 || activeCardId === 23) {
      const targetExample = examples.find(ex => ex.id === activeCardId)
      if (targetExample) {
        targetExample.action()
        return
      }
    }
    
    addToast({
      type: config.type,
      title: config.title,
      description: config.description,
      showDescription: config.showDescription,
      showAction: config.showAction,
      actionText: config.actionText,
      customColor: config.customColor,
      hasBorder: config.hasBorder,
      bounce: config.bounce,
      theme: config.theme,
      showProgress: config.showProgress,
      closeOnEscape: config.closeOnEscape,
      showTimestamp: config.showTimestamp,
      showCloseButton: config.showCloseButton,
      position: config.position
    })
  }

  const getMascotMood = () => {
    if (config.theme === 'dark') return 'sleepy'
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

  const codeSnippet = `import { toast } from 'toastyy'

toast.${config.type}('${config.title}', {
  description: ${config.showDescription ? `'${config.description}'` : 'undefined'},
  position: '${config.position}',
  theme: '${config.theme}',
  showProgress: ${config.showProgress},
  closeOnEscape: ${config.closeOnEscape},
  showTimestamp: ${config.showTimestamp},
  showCloseButton: ${config.showCloseButton},
  hasBorder: ${config.hasBorder},
  bounce: ${config.bounce},
  customColor: '${config.customColor}',
  showAction: ${config.showAction},
  actionText: '${config.actionText}'
})`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    addToast({
      type: 'success',
      title: 'Copied Config!',
      description: 'The code is ready to paste.'
    })
    setTimeout(() => setCopied(false), 2000)
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
      builderConfig: {
        title: 'System Dispatch Active',
        description: 'Standard system operations are running normally.',
        showDescription: false,
        showAction: false,
        actionText: 'Undo',
        customColor: '#ff8c3b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
      builderConfig: {
        title: 'Golden Butter Toast Ready',
        description: 'Baked to absolute crispy perfection.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'success' as const
      },
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
      builderConfig: {
        title: 'Burnt Toast Alert',
        description: 'Heating element exceeded thermal bounds.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'error' as const
      },
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
      builderConfig: {
        title: 'Oven Temperature Limit Reached',
        description: 'Bake chambers require ventilation.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f1a91d',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'warning' as const
      },
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
      builderConfig: {
        title: 'Chef Recommendation Active',
        description: 'Sourdough is pre-heating in chamber-04.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#3b82f6',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'info' as const
      },
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
      builderConfig: {
        title: 'Gourmet Selection',
        description: 'Freshly baked sourdough slice with cream cheese.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#ff8c3b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
      builderConfig: {
        title: 'Internal Temperature Warning',
        description: 'Thermostat exceeds 450 degrees in bake-chamber-02.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f1a91d',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'warning' as const
      },
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
      builderConfig: {
        title: 'Baking Cycle Failed',
        description: 'Connection lost with internal thermostat nodes.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'error' as const
      },
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
      builderConfig: {
        title: 'Telemetry Node Synced',
        description: 'System configurations have synced globally.',
        showDescription: true,
        showAction: true,
        actionText: 'View Logs',
        customColor: '#3b82f6',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
      builderConfig: {
        title: 'Connection Timed Out',
        description: 'Retry compiling active modules.',
        showDescription: true,
        showAction: true,
        actionText: 'Retry Compile',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'error' as const
      },
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
      builderConfig: {
        title: 'Sourdough Sliced Successfully',
        description: 'Slice is warm and toasted.',
        showDescription: false,
        showAction: true,
        actionText: 'Spread Butter',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.15,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'success' as const
      },
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
      builderConfig: {
        title: 'Upgrade Plan Success',
        description: 'Upgraded to Gourmet Tier. Direct receipt sent to billing.',
        showDescription: true,
        showAction: true,
        actionText: 'View Invoice',
        customColor: '#e06c1f',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
      builderConfig: {
        title: 'Server Active',
        description: 'Cluster-04 is running at 98% efficiency.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#ff8c3b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'info' as const
      },
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
      builderConfig: {
        title: 'Smooth Slide Active',
        description: 'Fired with no spring physics.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#3b82f6',
        hasBorder: true,
        bounce: 0.00,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
      builderConfig: {
        title: 'Files Saved in Workspace',
        description: 'Synchronized with origin/main branch.',
        showDescription: false,
        showAction: false,
        actionText: 'Undo',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.00,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'success' as const
      },
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
      builderConfig: {
        title: 'Hardware Failure Registered',
        description: 'Critical crash handled with no spring.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.00,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'error' as const
      },
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
      builderConfig: {
        title: 'Database Overcapacity',
        description: 'Fired with no spring.',
        showDescription: true,
        showAction: true,
        actionText: 'Rollback',
        customColor: '#888888',
        hasBorder: true,
        bounce: 0.00,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'warning' as const
      },
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
      builderConfig: {
        title: 'Fetching gourmet assets...',
        description: 'Contacting server databases...',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#ff8c3b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'loading' as const
      },
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
      builderConfig: {
        title: 'Bundling modules...',
        description: 'Tuning bundler options...',
        showDescription: false,
        showAction: false,
        actionText: 'Undo',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.15,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'loading' as const
      },
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
      builderConfig: {
        title: 'Deploying tunnel...',
        description: 'Setting up secure links...',
        showDescription: false,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.15,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'loading' as const
      },
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
      builderConfig: {
        title: 'Resolving DNS records...',
        description: 'Contacting server...',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#f43f5e',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'loading' as const
      },
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
      builderConfig: {
        title: 'Syncing user workspace...',
        description: 'Uploading details...',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'loading' as const
      },
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
      builderConfig: {
        title: 'Verifying user credentials...',
        description: 'Connecting to database auth servers...',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#3b82f6',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'info' as const
      },
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
      builderConfig: {
        title: 'Automatic Backup Complete',
        description: 'Review updates in settings.',
        showDescription: true,
        showAction: false,
        actionText: 'Undo',
        customColor: '#0bc47b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'success' as const
      },
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
      builderConfig: {
        title: 'Action Triggered Callback',
        description: 'Click below to dispatch target events.',
        showDescription: true,
        showAction: true,
        actionText: 'Execute Callback',
        customColor: '#ff8c3b',
        hasBorder: true,
        bounce: 0.40,
        theme: 'light' as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: 'bottom-right' as const,
        type: 'default' as const
      },
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
            Discover beautiful preset configurations. Click any card to highlight it and open the slide-out visual builder drawer!
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
            const isActive = activeCardId === example.id
            return (
              <motion.div
                key={example.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: isActive ? 1.02 : 1, 
                  y: 0,
                  borderColor: isActive ? '#ff8c3b' : 'rgba(255,140,59,0.1)'
                }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, delay: i * 0.01 }}
                whileHover={{ y: -3 }}
                onClick={() => handleCardClick(example)}
                className={`glass rounded-[24px] border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${isActive ? 'ring-2 ring-accent/20 shadow-[0_0_15px_rgba(255,140,59,0.15)] bg-white' : ''}`}
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
                    Configure
                    <Code className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsDrawerOpen(false)
                setActiveCardId(null)
              }}
              className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[460px] z-50 bg-white border-l border-border-strong shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border-strong flex items-center justify-between bg-surface-2 select-none">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-extrabold text-text">Visual Studio Engine</span>
                </div>
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false)
                    setActiveCardId(null)
                  }}
                  className="p-1.5 rounded-lg hover:bg-border-strong text-text-3 hover:text-text transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                <div className="flex justify-center py-4 bg-surface-2 rounded-2xl border border-border-strong/50 select-none">
                  <ToastMascot size={110} mood={getMascotMood()} interactive={true} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 select-none">
                    <Sliders className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Content Parameters</span>
                  </div>
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-text-2">Title</label>
                      <input 
                        type="text" 
                        value={config.title}
                        onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5 bg-white border border-border-strong p-3.5 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-text-2">Show Description</label>
                        <button 
                          onClick={() => setConfig(prev => ({ ...prev, showDescription: !prev.showDescription }))}
                          className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.showDescription ? 'bg-accent' : 'bg-border-strong'}`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.showDescription ? 'right-0.75' : 'left-0.75'}`} />
                        </button>
                      </div>
                      {config.showDescription && (
                        <textarea 
                          value={config.description}
                          onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                          rows={2}
                          className="w-full mt-2 px-3 py-2 bg-surface-2 border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:border-accent transition-all resize-none font-semibold leading-relaxed"
                        />
                      )}
                    </div>

                    <div className="space-y-1.5 bg-white border border-border-strong p-3.5 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-text-2">Show Action Button</label>
                        <button 
                          onClick={() => setConfig(prev => ({ ...prev, showAction: !prev.showAction }))}
                          className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.showAction ? 'bg-accent' : 'bg-border-strong'}`}
                        >
                          <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.showAction ? 'right-0.75' : 'left-0.75'}`} />
                        </button>
                      </div>
                      {config.showAction && (
                        <input 
                          type="text" 
                          value={config.actionText}
                          onChange={(e) => setConfig(prev => ({ ...prev, actionText: e.target.value }))}
                          className="w-full mt-2 px-3 py-2 bg-surface-2 border border-border-strong rounded-xl text-xs text-text focus:outline-none focus:border-accent transition-all font-semibold"
                          placeholder="Button label..."
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 select-none">
                    <Sparkles className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Appearance Type</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['default', 'success', 'error', 'warning', 'info'] as ToastType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setConfig(prev => ({ ...prev, type }))}
                        className={`px-2.5 py-2 rounded-xl border text-[10px] font-bold capitalize transition-all ${config.type === type ? 'bg-gradient-to-r from-accent to-accent-2 border-transparent text-white shadow-sm' : 'bg-white border-border-strong text-text-2 hover:border-accent/40'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 select-none">
                    <Compass className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Viewport Position</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['top-left', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as ToastPosition[]).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setConfig(prev => ({ ...prev, position: pos }))}
                        className={`px-3 py-2 rounded-xl border text-[10px] font-bold transition-all ${config.position === pos ? 'bg-gradient-to-r from-accent to-accent-2 border-transparent text-white shadow-sm' : 'bg-white border-border-strong text-text-2 hover:border-accent/40'}`}
                      >
                        {pos.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-white border border-border-strong p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-1.5 select-none pb-2 border-b border-border-strong">
                    <Palette className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Accent Style</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-text-2">Toast Brand Color</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-text-3 uppercase tracking-wider font-mono">{config.customColor}</span>
                      <input 
                        type="color" 
                        value={config.customColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, customColor: e.target.value }))}
                        className="w-8 h-8 rounded-full border border-border-strong cursor-pointer overflow-hidden p-0 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-strong/50">
                    <span className="text-xs font-bold text-text-2">Theme Mode</span>
                    <div className="flex bg-surface-2 p-0.5 rounded-lg border border-border-strong select-none">
                      {(['light', 'dark'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setConfig(prev => ({ ...prev, theme: t }))}
                          className={`px-3 py-1 rounded-md text-[10px] font-black capitalize transition-all ${config.theme === t ? 'bg-white text-accent shadow-sm' : 'text-text-3'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 select-none">
                    <Wind className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Spring Physics</span>
                  </div>
                  <div className="bg-white border border-border-strong p-3.5 rounded-xl shadow-sm">
                    <div className="flex justify-between text-[11px] font-extrabold text-text-2 mb-2">
                      <span>Bounce Coefficient</span>
                      <span className="text-accent-2 font-mono">{config.bounce.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.00" 
                      max="0.90" 
                      step="0.05"
                      value={config.bounce}
                      onChange={(e) => setConfig(prev => ({ ...prev, bounce: parseFloat(e.target.value) }))}
                      className="w-full accent-accent"
                    />
                  </div>
                </div>

                <div className="space-y-3 bg-white border border-border-strong p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-1.5 select-none pb-2 border-b border-border-strong">
                    <Eye className="w-3.5 h-3.5 text-accent-2" />
                    <span className="text-[10px] font-extrabold text-text-2 uppercase tracking-wider">Features & Behavior</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-text-2">Draw Outer Border</span>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, hasBorder: !prev.hasBorder }))}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.hasBorder ? 'bg-accent' : 'bg-border-strong'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.hasBorder ? 'right-0.75' : 'left-0.75'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                    <span className="text-xs font-bold text-text-2">Progress Bar</span>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, showProgress: !prev.showProgress }))}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.showProgress ? 'bg-accent' : 'bg-border-strong'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.showProgress ? 'right-0.75' : 'left-0.75'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                    <span className="text-xs font-bold text-text-2">Close on Escape Key</span>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, closeOnEscape: !prev.closeOnEscape }))}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.closeOnEscape ? 'bg-accent' : 'bg-border-strong'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.closeOnEscape ? 'right-0.75' : 'left-0.75'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                    <span className="text-xs font-bold text-text-2">Show Timestamp</span>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, showTimestamp: !prev.showTimestamp }))}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.showTimestamp ? 'bg-accent' : 'bg-border-strong'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.showTimestamp ? 'right-0.75' : 'left-0.75'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border-strong/40">
                    <span className="text-xs font-bold text-text-2">Show Close Button (X)</span>
                    <button 
                      onClick={() => setConfig(prev => ({ ...prev, showCloseButton: !prev.showCloseButton }))}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${config.showCloseButton ? 'bg-accent' : 'bg-border-strong'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute transition-all ${config.showCloseButton ? 'right-0.75' : 'left-0.75'}`} />
                    </button>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`glass rounded-2xl border border-accent/10 shadow-md overflow-hidden flex flex-col ${showCode ? 'h-[220px]' : 'h-12'}`}
                  >
                    <div className="px-4 py-2.5 border-b border-border-strong flex items-center justify-between bg-surface-2 select-none">
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[9px] font-extrabold text-text-2 tracking-widest uppercase">Exporter</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={handleCopy}
                          className="p-1 rounded hover:bg-border-strong text-text-3 hover:text-accent transition-all"
                          title="Copy Code"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button 
                          onClick={() => setShowCode(!showCode)}
                          className="p-1 rounded hover:bg-border-strong text-text-3 hover:text-accent transition-all"
                        >
                          <Maximize2 className={`w-3.5 h-3.5 transition-transform ${showCode ? 'rotate-180' : ''}`} />
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
                              fontSize: 11,
                              lineNumbers: 'off',
                              readOnly: true,
                              padding: { top: 12, bottom: 12 },
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

              <div className="p-6 border-t border-border-strong bg-surface-2 flex flex-col gap-2.5 select-none">
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
                    showDescription: true,
                    showAction: false,
                    actionText: 'Undo',
                    customColor: '#ff8c3b',
                    hasBorder: true,
                    bounce: 0.40,
                    theme: 'light',
                    showProgress: true,
                    closeOnEscape: false,
                    showTimestamp: false,
                    showCloseButton: true,
                    position: 'bottom-right',
                    type: 'success'
                  })}
                  className="flex items-center justify-center gap-1.5 text-[9px] font-extrabold text-text-3 hover:text-accent-2 transition-colors uppercase tracking-widest py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Recipe
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mt-20 border-t border-border-strong pt-16 flex flex-col items-center text-center select-none">
        <div className="w-20 h-20 bg-gradient-to-tr from-accent/15 to-transparent rounded-full flex items-center justify-center mb-6">
          <ToastMascot size={56} mood="excited" interactive={true} />
        </div>
        <h3 className="text-lg font-extrabold text-text mb-2">Build Your Own Custom Flavor</h3>
        <p className="text-text-2 text-xs md:text-sm max-w-sm mb-6 leading-relaxed">
          Need a custom spring profile or personalized color variables? Click any card above to trigger the Advanced Visual Studio drawer.
        </p>
      </div>
    </div>
  )
}

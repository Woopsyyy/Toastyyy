import { motion } from 'framer-motion'
import { 
  Heart, 
  Download, 
  ExternalLink, 
  Code,
  Layout as LayoutIcon,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Clock,
  Zap
} from 'lucide-react'
import { useToasts } from '../hooks/useToasts'

const examples = [
  {
    id: 1,
    title: 'Success Feedback',
    category: 'Status',
    tags: ['Motion', 'Feedback'],
    likes: 124,
    downloads: '2.4k',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'success', title: 'Data synced successfully', description: 'Your changes are now live on the server.' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-500 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    )
  },
  {
    id: 2,
    title: 'System Alert',
    category: 'Warning',
    tags: ['Security', 'Alert'],
    likes: 89,
    downloads: '1.1k',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'warning', title: 'Security Token Expiring', description: 'Please re-authenticate within the next 5 minutes.' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-amber-500 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <AlertTriangle className="w-6 h-6" />
        </button>
      </div>
    )
  },
  {
    id: 3,
    title: 'Message Inbox',
    category: 'Communication',
    tags: ['App', 'Social'],
    likes: 210,
    downloads: '4.8k',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'info', title: 'New Message from Alex', description: '"Hey! Just saw your latest update on the dashboard..." ' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-500 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    )
  },
  {
    id: 4,
    title: 'Critical Error',
    category: 'Danger',
    tags: ['System', 'Error'],
    likes: 56,
    downloads: '800',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'error', title: 'Payment Declined', description: 'Transaction #9283 failed. Card ending in 4242.' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>
    )
  },
  {
    id: 5,
    title: 'Update Available',
    category: 'System',
    tags: ['Update', 'Software'],
    likes: 142,
    downloads: '1.9k',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'default', title: 'v2.4.0 is available', description: 'New premium motion presets have been added.' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-700 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <Download className="w-6 h-6" />
        </button>
      </div>
    )
  },
  {
    id: 6,
    title: 'Task Reminder',
    category: 'Productivity',
    tags: ['Time', 'Tasks'],
    likes: 95,
    downloads: '1.2k',
    preview: (addToast: any) => (
      <div className="w-full h-32 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToast({ type: 'info', title: 'Upcoming Meeting', description: 'Sprint planning starts in 10 minutes.' });
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500 scale-100 hover:scale-110 transition-transform active:scale-95"
        >
          <Clock className="w-6 h-6" />
        </button>
      </div>
    )
  }
]

export default function ExamplesPage() {
  const { addToast } = useToasts()

  return (
    <div className="container-tight py-20 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
              <LayoutIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Showcase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-4"
          >
            Interactive <span className="gradient-text">Examples</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-2 text-lg text-balance leading-relaxed"
          >
            Explore how top-tier teams use Toastyyy to build high-performance 
            user feedback loops and notification systems.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex bg-surface rounded-xl border border-border p-1 shadow-sm"
        >
          {['All', 'Status', 'App', 'System'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${i === 0 ? 'bg-white shadow-sm text-brand-600' : 'text-text-3 hover:text-text-2'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((example, i) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            whileHover={{ y: -6 }}
            className="card group overflow-hidden border-border/50 hover:border-brand-200/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-4 bg-surface-2/30">
              {example.preview(addToast)}
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-text-3 uppercase tracking-wider">{example.category}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-medium text-text-3 group-hover:text-red-500 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    {example.likes}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-text-3">
                    <Download className="w-3.5 h-3.5" />
                    {example.downloads}
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-3 group-hover:text-brand-600 transition-colors">{example.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {example.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-2 text-[10px] font-bold text-text-2 border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <button className="text-xs font-bold text-brand-600 flex items-center gap-1.5 hover:gap-2 transition-all">
                  <Code className="w-3.5 h-3.5" />
                  View Source
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-2 transition-colors">
                  <ExternalLink className="w-4 h-4 text-text-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <div className="inline-flex flex-col items-center">
          <p className="text-sm text-text-3 font-medium mb-4 uppercase tracking-[0.2em]">Want to share your creation?</p>
          <button className="btn-ghost px-10 py-4 text-base font-bold shadow-sm">
            Submit an Example
          </button>
        </div>
      </div>
    </div>
  )
}

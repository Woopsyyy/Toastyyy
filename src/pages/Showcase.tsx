import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const showcases = [
  { name: 'DataPulse', desc: 'Real-time analytics platform for SaaS businesses', category: 'Analytics', color: '#FF6B35' },
  { name: 'AdminFlow', desc: 'Multi-tenant admin panel for enterprise teams', category: 'Admin', color: '#F59E0B' },
  { name: 'KanbanPro', desc: 'Agile project management with drag-drop boards', category: 'Productivity', color: '#10B981' },
  { name: 'SalesPath', desc: 'CRM dashboard with deal pipeline and forecasting', category: 'CRM', color: '#8B5CF6' },
  { name: 'QueueMaster', desc: 'Queue management system for service businesses', category: 'Operations', color: '#EC4899' },
  { name: 'RevenueMap', desc: 'Financial analytics with MRR, ARR, and churn', category: 'Finance', color: '#06B6D4' },
];

export default function Showcase() {
  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Showcase</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Built with Toasty</h1>
          <p className="text-gray-500">Real products built by real teams using Toasty's ecosystem.</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map(s => (
            <motion.div key={s.name} variants={fadeInUp as any} whileHover={{ y: -5 }}
              className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white">
              <div className="h-44 relative overflow-hidden" style={{ background: `${s.color}10` }}>
                <div className="absolute inset-5 rounded-2xl border" style={{ borderColor: `${s.color}25`, background: `${s.color}06` }}>
                  <div className="p-4 space-y-3">
                    <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 rounded-xl flex-1" style={{ background: `${s.color}${i === 1 ? '40' : '20'}` }} />
                      ))}
                    </div>
                    <div className="h-16 rounded-xl" style={{ background: `${s.color}15` }} />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                    style={{ background: s.color }}>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{s.name}</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full font-medium" style={{ background: `${s.color}15`, color: s.color }}>{s.category}</span>
                </div>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

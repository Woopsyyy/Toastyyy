import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '../animations/variants';

const templates = [
  { title: 'Analytics Dashboard', desc: 'Full analytics suite with KPIs, charts, tables, and filters.', tag: 'Popular', color: '#FF6B35', stats: '12 widgets' },
  { title: 'Admin Panel', desc: 'User management, role permissions, settings, and activity logs.', tag: 'New', color: '#F59E0B', stats: '18 widgets' },
  { title: 'SaaS Dashboard', desc: 'MRR, churn, subscriptions, trial conversions, revenue charts.', tag: null, color: '#10B981', stats: '14 widgets' },
  { title: 'CRM System', desc: 'Contacts, pipeline stages, deal cards, and email tracking.', tag: null, color: '#8B5CF6', stats: '16 widgets' },
  { title: 'Kanban Board', desc: 'Drag-and-drop task management with swimlanes and labels.', tag: 'Free', color: '#EC4899', stats: '8 widgets' },
  { title: 'POS Dashboard', desc: 'Point of sale with product catalog, orders, and receipt printing.', tag: null, color: '#06B6D4', stats: '10 widgets' },
  { title: 'Queue Manager', desc: 'Real-time queue system with position tracking and notifications.', tag: null, color: '#F97316', stats: '9 widgets' },
  { title: 'E-commerce', desc: 'Product management, inventory, sales reports, and customer analytics.', tag: null, color: '#EF4444', stats: '20 widgets' },
];

export default function Templates() {
  return (
    <div className="pt-20 pb-24 bg-gray-50">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Templates</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Production-ready templates</h1>
          <p className="text-gray-500">Start with a full template, customize it, ship it. No design work needed.</p>
        </motion.div>

        <motion.div variants={staggerContainer as any} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {templates.map(t => (
            <motion.div key={t.title} variants={fadeInUp as any} whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
              {/* Preview area */}
              <div className="h-36 relative overflow-hidden" style={{ background: `${t.color}12` }}>
                <div className="absolute inset-4 rounded-xl border" style={{ borderColor: `${t.color}30`, background: `${t.color}08` }}>
                  <div className="p-3 space-y-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex gap-2">
                        <div className="h-2 rounded-full flex-1" style={{ background: `${t.color}30` }} />
                        <div className="h-2 rounded-full w-1/3" style={{ background: `${t.color}20` }} />
                      </div>
                    ))}
                  </div>
                </div>
                {t.tag && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full text-white"
                    style={{ background: t.color }}>{t.tag}</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1.5">{t.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{t.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{t.stats}</span>
                  <Link to="/playground" className="flex items-center gap-1 text-xs font-semibold transition-colors hover:gap-2"
                    style={{ color: t.color }}>
                    Preview <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

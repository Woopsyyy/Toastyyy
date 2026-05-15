import { motion } from 'framer-motion';
import { BarChart2, Layout, Zap, Palette, Box, Activity } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const features = [
  { icon: BarChart2, title: 'Graph & Chart Library', desc: 'Beautiful animated charts — line, bar, area, pie, radar. Gradient support, tooltips, and responsive by default.', color: '#FF6B35' },
  { icon: Layout, title: 'Dashboard Builder', desc: 'Drag-and-drop layout system. Build admin panels, analytics dashboards, POS, CRM, kanban — visually.', color: '#F59E0B' },
  { icon: Zap, title: 'Motion System', desc: 'Framer Motion powered micro-animations. Page transitions, stagger reveals, float effects — premium feel.', color: '#10B981' },
  { icon: Palette, title: 'Theme Engine', desc: 'Full theming support. Light, dark, glass, neon, corporate. Token-based design system out of the box.', color: '#8B5CF6' },
  { icon: Box, title: 'Component Library', desc: '50+ drop-in React components. Buttons, cards, modals, tables, sidebars, command palette — all TypeScript-ready.', color: '#EC4899' },
  { icon: Activity, title: 'Realtime Analytics', desc: 'Built-in realtime chart support. Live dashboards, WebSocket-ready, smooth update animations.', color: '#06B6D4' },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">
            Everything You Need
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            The complete frontend ecosystem
          </h2>
          <p className="text-gray-500 text-lg">One package, every tool you need to build stunning dashboards and data UIs for React.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, desc, color }) => (
            <motion.div key={title} variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}18` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

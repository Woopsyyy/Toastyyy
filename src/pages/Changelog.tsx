import { motion } from 'framer-motion';
import { Zap, Package, Wrench, Bug } from 'lucide-react';

const changes = [
  { version: 'v1.0.0', date: 'May 14, 2026', items: [
    { type: 'feature', text: 'Initial public release of Toasty ecosystem' },
    { type: 'feature', text: 'toasty-graph-ui: AreaChart, BarChart, LineChart, PieChart' },
    { type: 'feature', text: 'toasty-dashboard-ui: DashboardLayout, DragDropBuilder, Widgets' },
    { type: 'feature', text: 'toasty-motion-ui: Page transitions, stagger, float animations' },
    { type: 'feature', text: 'toasty-theme-engine: Light theme, CSS variable tokens' },
    { type: 'feature', text: 'Supabase authentication integration' },
    { type: 'feature', text: '50+ reusable components with TypeScript support' },
  ]},
  { version: 'v0.9.0-beta', date: 'Apr 30, 2026', items: [
    { type: 'feature', text: 'Beta release with 8 core chart types' },
    { type: 'fix', text: 'Fixed chart tooltip positioning on mobile' },
    { type: 'improvement', text: 'Improved animation performance with GPU compositing' },
  ]},
  { version: 'v0.8.0-alpha', date: 'Apr 10, 2026', items: [
    { type: 'feature', text: 'Alpha: area chart and bar chart' },
    { type: 'feature', text: 'Basic dashboard layout system' },
    { type: 'fix', text: 'Resolved Tailwind CSS v4 compatibility issues' },
  ]},
];

const icons: Record<string, React.ReactNode> = {
  feature: <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />,
  fix: <Bug className="w-3.5 h-3.5 text-red-500" />,
  improvement: <Wrench className="w-3.5 h-3.5 text-[#F59E0B]" />,
};

export default function Changelog() {
  return (
    <div className="pt-20 pb-24 bg-gray-50">
      <div className="page-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Changelog</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">What's new in Toasty</h1>
          <p className="text-gray-500">Every release, every fix, documented here.</p>
        </motion.div>

        <div className="space-y-8">
          {changes.map((release, i) => (
            <motion.div key={release.version} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{release.version}</h2>
                  <p className="text-xs text-gray-400">{release.date}</p>
                </div>
                {i === 0 && <span className="ml-auto px-3 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-600 border border-green-100">Latest</span>}
              </div>
              <ul className="space-y-2.5">
                {release.items.map(item => (
                  <li key={item.text} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0">{icons[item.type]}</span>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

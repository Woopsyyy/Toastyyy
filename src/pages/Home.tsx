import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { ToastyAreaChart, ToastyBarChart } from '../components/charts/Charts';
import CodeBlock from '../components/ui/CodeBlock';
import { ArrowRight, Terminal } from 'lucide-react';

const TEMPLATES = [
  { title: 'Analytics Dashboard', desc: 'Full analytics with charts, KPIs and tables', tag: 'Popular', color: '#FF6B35' },
  { title: 'Admin Panel', desc: 'User management, settings, permissions', tag: 'New', color: '#F59E0B' },
  { title: 'SaaS Dashboard', desc: 'Subscriptions, MRR, churn metrics', tag: null, color: '#10B981' },
  { title: 'CRM System', desc: 'Contacts, pipeline, deal tracking', tag: null, color: '#8B5CF6' },
];

const FAQS = [
  { q: 'Is Toasty free to use?', a: 'Yes! Toasty is 100% free and open source under the MIT license. You can use it for personal and commercial projects without any cost.' },
  { q: 'Does it work with Next.js?', a: 'Absolutely. Toasty is framework-agnostic — works with Vite, Next.js, Remix, and any React setup.' },
  { q: 'Is TypeScript supported?', a: 'Yes. Every component ships with full TypeScript types. No @types packages needed.' },
  { q: 'Can I customize the themes?', a: 'Fully. The theme engine uses CSS variables and tokens so you can customize every color, radius, and shadow.' },
];

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />

      {/* Graph Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Charts</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Beautiful charts out of the box</h2>
            <p className="text-gray-500">Animated, responsive, and fully customizable. Gradient fills, smooth curves, live data-ready.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
              <p className="text-sm font-semibold text-gray-700 mb-4">Area Chart — Revenue vs Users</p>
              <ToastyAreaChart height={240} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
              <p className="text-sm font-semibold text-gray-700 mb-4">Bar Chart — Monthly Breakdown</p>
              <ToastyBarChart height={240} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Templates</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Production-ready templates</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {TEMPLATES.map((t, i) => (
              <motion.div key={t.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: `${t.color}18` }}>
                  <div className="w-5 h-5 rounded" style={{ background: t.color }} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-gray-900">{t.title}</h3>
                  {t.tag && <span className="px-2 py-0.5 text-xs rounded-full" style={{ background: `${t.color}18`, color: t.color }}>{t.tag}</span>}
                </div>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-medium text-[#FF6B35] hover:gap-3 transition-all">
              View all templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Code Export */}
      <section className="py-24 bg-gray-900">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-6 inline-block">Install</span>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Up and running in seconds</h2>
              <p className="text-gray-400 mb-8">Install the packages you need, drop in the components, customize with your brand. That's it.</p>
              <div className="space-y-3">
                <CodeBlock code="npm install toasty-graph-ui toasty-dashboard-ui" language="bash" />
                <CodeBlock code={`import { AreaChart, Dashboard } from 'toasty-graph-ui';\n\nexport default function App() {\n  return <Dashboard theme="light"><AreaChart data={data} /></Dashboard>;\n}`} language="tsx" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-4">
              {['toasty-graph-ui', 'toasty-dashboard-ui', 'toasty-motion-ui', 'toasty-charts', 'toasty-theme-engine'].map((pkg, i) => (
                <div key={pkg} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-mono text-gray-200">{pkg}</span>
                  </div>
                  <span className="text-xs text-gray-500">v1.0.{i}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="page-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div key={faq.q}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="page-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Start building with <span className="gradient-text">Toasty</span> today
            </h2>
            <p className="text-lg text-gray-500 mb-10">Free forever. No credit card required.</p>
            <Link to="/register"
              className="inline-flex items-center gap-2 px-9 py-4 text-base font-bold text-white rounded-2xl transition-all hover:shadow-2xl hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', boxShadow: '0 12px 40px rgba(255,107,53,0.38)' }}>
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

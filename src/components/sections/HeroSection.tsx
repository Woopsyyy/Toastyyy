import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Layers } from 'lucide-react';
import { ToastyAreaChart } from '../charts/Charts';
import { fadeInUp, staggerContainer, floatAnimation } from '../../animations/variants';

const BADGES = ['Graph Library', 'Dashboard Framework', 'Component System', 'Analytics SaaS'];
const TRUSTED = ['Vercel', 'Linear', 'Framer', 'Notion', 'Stripe', 'Loom'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #FF6B35 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #F59E0B 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="page-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge row */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {BADGES.map(b => (
              <span key={b} className="px-3 py-1 text-xs font-medium rounded-full border border-orange-200 text-orange-600 bg-orange-50">
                {b}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6">
            Build Stunning{' '}
            <span className="gradient-text">Dashboards</span>
            <br />in Minutes
          </motion.h1>

          <motion.p variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Toasty is the premium graph, dashboard, and component ecosystem for React.
            Drop-in charts, templates, and drag-drop builders — all beautifully animated.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-2xl hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', boxShadow: '0 8px 32px rgba(255,107,53,0.35)' }}>
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
              View Docs
            </Link>
          </motion.div>

          {/* Floating hero card */}
          <motion.div
            variants={fadeInUp}
            className="relative mx-auto max-w-4xl"
          >
            <motion.div
              animate={floatAnimation as any}
              className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="flex-1 mx-4 py-1 px-3 bg-white rounded-lg text-xs text-gray-400 text-left">
                  toasty-dashboard.app
                </span>
              </div>

              {/* Dashboard preview */}
              <div className="p-6 bg-gray-50">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Revenue', value: '$48.2K', change: '+12%', color: '#FF6B35' },
                    { label: 'Users', value: '18,420', change: '+8%', color: '#F59E0B' },
                    { label: 'Sessions', value: '94.2K', change: '+23%', color: '#10B981' },
                    { label: 'Conversion', value: '4.8%', change: '+1.2%', color: '#8B5CF6' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                      <p className="text-lg font-bold text-gray-900">{s.value}</p>
                      <p className="text-xs font-medium mt-1" style={{ color: s.color }}>{s.change}</p>
                    </div>
                  ))}
                </div>
                {/* Chart */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700">Revenue Overview</h3>
                    <span className="text-xs text-gray-400">Last 12 months</span>
                  </div>
                  <ToastyAreaChart height={200} />
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-5 -right-6 glass rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-2.5"
            >
              <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-green-50">
                <BarChart2 className="w-4 h-4 text-green-600" />
              </span>
              <div>
                <p className="text-xs font-semibold text-gray-900">Live Charts</p>
                <p className="text-xs text-gray-500">Realtime updates</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -left-6 glass rounded-2xl px-4 py-3 shadow-xl hidden lg:flex items-center gap-2.5"
            >
              <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
                <Layers className="w-4 h-4 text-[#FF6B35]" />
              </span>
              <div>
                <p className="text-xs font-semibold text-gray-900">50+ Components</p>
                <p className="text-xs text-gray-500">Plug and play</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {TRUSTED.map(name => (
              <span key={name} className="text-gray-300 font-bold text-lg tracking-tight hover:text-gray-500 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const plans = [
  {
    name: 'Free', price: '$0', period: '/month', badge: null,
    desc: 'Perfect for open source projects and personal use.',
    features: ['All core components', '7 chart types', 'Dashboard builder', 'Themes (Light)', '3 templates', 'Community support'],
    cta: 'Get Started Free', href: '/register', primary: false,
  },
  {
    name: 'Pro', price: '$29', period: '/month', badge: 'Most Popular',
    desc: 'For startups and growing teams shipping fast.',
    features: ['Everything in Free', 'Unlimited templates', 'All themes (Dark, Glass, Neon)', 'Priority support', 'Realtime charts', 'Export code', 'Custom branding'],
    cta: 'Start Free Trial', href: '/register', primary: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', badge: null,
    desc: 'For teams at scale with advanced requirements.',
    features: ['Everything in Pro', 'SSO / SAML', 'Dedicated support', 'SLA guarantee', 'On-prem deployment', 'Custom integrations', 'Team seats'],
    cta: 'Contact Sales', href: '/community', primary: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Pricing</span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-500 text-lg">Start free, upgrade when you need more. No hidden fees.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map(plan => (
            <motion.div key={plan.name} variants={fadeInUp}
              className={`relative rounded-3xl p-8 border flex flex-col ${plan.primary ? 'bg-gray-900 border-gray-700 shadow-2xl' : 'bg-white border-gray-100 shadow-md'}`}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 text-xs font-semibold text-white rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <p className={`text-sm font-semibold mb-1 ${plan.primary ? 'text-gray-400' : 'text-gray-500'}`}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl font-extrabold ${plan.primary ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.primary ? 'text-gray-500' : 'text-gray-400'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm ${plan.primary ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.primary ? '#FF6B35' : '#10B981' }} />
                    <span className={`text-sm ${plan.primary ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.href}
                className={`w-full py-3 text-sm font-semibold rounded-xl text-center transition-all ${plan.primary
                  ? 'text-white hover:shadow-xl hover:-translate-y-0.5'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                style={plan.primary ? { background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', boxShadow: '0 4px 16px rgba(255,107,53,0.3)' } : undefined}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

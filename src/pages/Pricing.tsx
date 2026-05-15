import { motion } from 'framer-motion';
import PricingSection from '../components/sections/PricingSection';

export default function Pricing() {
  return (
    <div className="pt-16">
      <PricingSection />
      <div className="py-16 bg-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-xl mx-auto page-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a custom plan?</h2>
          <p className="text-gray-500 mb-6">Large team or special requirements? Talk to us — we'll figure it out.</p>
          <a href="mailto:hello@toasty.dev"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
            Contact Sales
          </a>
        </motion.div>
      </div>
    </div>
  );
}

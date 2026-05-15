import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const testimonials = [
  { name: 'Alex Chen', role: 'CTO @ DataPulse', avatar: 'AC', text: 'Toasty cut our dashboard build time from 3 weeks to 2 days. The chart system is unmatched.', color: '#FF6B35' },
  { name: 'Sarah Park', role: 'Lead Dev @ Launchpad', avatar: 'SP', text: 'The drag-and-drop builder is incredible. We ship admin panels in hours now. The animations feel so premium.', color: '#F59E0B' },
  { name: 'Marcus West', role: 'Founder @ Buildly', avatar: 'MW', text: "We replaced three separate libraries with Toasty. The theme engine and components are exactly what we needed.", color: '#10B981' },
  { name: 'Priya Nair', role: 'Designer @ Vex Studio', avatar: 'PN', text: 'Finally a React UI library that actually looks good out of the box. The glassmorphism effects are stunning.', color: '#8B5CF6' },
  { name: 'Tom Rivera', role: 'SaaS Builder', avatar: 'TR', text: 'I ship dashboards for clients weekly now. Toasty pays for itself with the first project.', color: '#EC4899' },
  { name: 'Zoe Kim', role: 'Startup Engineer', avatar: 'ZK', text: 'The TypeScript support is perfect. Everything just works and looks beautiful. Highly recommended.', color: '#06B6D4' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Testimonials</span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Loved by developers worldwide</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

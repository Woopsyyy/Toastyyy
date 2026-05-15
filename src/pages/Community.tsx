import { motion } from 'framer-motion';
import { MessageCircle, Hash, Code2, BookOpen, ExternalLink, Users } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../animations/variants';

const links = [
  { title: 'Discord Server', desc: 'Join 12,000+ developers talking about React UIs.', icon: MessageCircle, color: '#5865F2', href: 'https://discord.com' },
  { title: 'GitHub Discussions', desc: 'Ask questions, share ideas, and request features.', icon: Code2, color: '#24292F', href: 'https://github.com' },
  { title: 'Twitter Updates', desc: 'Follow @toasty_dev for the latest news and drops.', icon: Hash, color: '#1DA1F2', href: 'https://twitter.com' },
  { title: 'Toasty Blog', desc: 'Read deep dives on engineering and design.', icon: BookOpen, color: '#FF6B35', href: '/blog' },
];

export default function Community() {
  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="page-container max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Community</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Join the Toasty ecosystem</h1>
          <p className="text-gray-500 text-lg">We are building the future of React dashboards together.</p>
        </motion.div>

        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-inner mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Help shape the future</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Toasty is completely open source and community-driven. Whether you want to contribute code, design new templates, or just help others learn, there's a place for you here.
              </p>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <Code2 className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {links.map(link => (
            <motion.a key={link.title} href={link.href} target="_blank" rel="noreferrer" variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ background: `${link.color}15` }}>
                <link.icon className="w-6 h-6" style={{ color: link.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{link.title}</h3>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

import { staggerContainer, fadeInUp } from '../animations/variants';

const posts = [
  { title: "Introducing Toasty v1.0", desc: "The most complete React dashboard ecosystem is now publicly available. Here's everything you need to know.", tag: "Release", date: "May 14, 2026", color: "#FF6B35", readTime: "5 min read" },
  { title: "Building a Real-time Dashboard with Toasty", desc: "Learn how to build a live analytics dashboard with WebSocket data and Toasty's area chart in under an hour.", tag: "Tutorial", date: "May 10, 2026", color: "#F59E0B", readTime: "8 min read" },
  { title: "Glassmorphism UI Patterns in 2026", desc: "Deep dive into modern glassmorphism techniques and how Toasty implements them with CSS and Framer Motion.", tag: "Design", date: "May 6, 2026", color: "#10B981", readTime: "6 min read" },
  { title: "Drag and Drop Dashboard Builder Guide", desc: "Step-by-step guide to using @dnd-kit with Toasty's layout system to create custom dashboard builders.", tag: "Tutorial", date: "Apr 28, 2026", color: "#8B5CF6", readTime: "10 min read" },
  { title: "TypeScript Best Practices for Component Libraries", desc: "How we designed Toasty's TypeScript API for maximum developer ergonomics and editor support.", tag: "Engineering", date: "Apr 20, 2026", color: "#EC4899", readTime: "7 min read" },
  { title: "Theme Engine Architecture Deep Dive", desc: "How Toasty's CSS variable-based theme system works under the hood and how to extend it.", tag: "Engineering", date: "Apr 12, 2026", color: "#06B6D4", readTime: "9 min read" },
];

export default function Blog() {
  return (
    <div className="pt-20 pb-24 bg-gray-50">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Blog</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Stories, guides, and releases</h1>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <motion.article key={post.title} variants={fadeInUp} whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="h-3 w-full" style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}88)` }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full" style={{ background: `${post.color}18`, color: post.color }}>{post.tag}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{post.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                  <button className="flex items-center gap-1 text-xs font-semibold transition-all hover:gap-2" style={{ color: post.color }}>
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

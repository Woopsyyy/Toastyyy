import { useState } from 'react';
import { motion } from 'framer-motion';

const themes = [
  { name: 'Light', desc: 'Clean, minimal Apple-style light theme', primary: '#FF6B35', bg: '#FAFAFA', text: '#111827', active: true },
  { name: 'Dark', desc: 'Elegant dark mode with deep grays', primary: '#FF6B35', bg: '#111827', text: '#F9FAFB', active: false },
  { name: 'Glass', desc: 'Frosted glass with blur effects', primary: '#6366F1', bg: 'rgba(255,255,255,0.1)', text: '#1E1B4B', active: false },
  { name: 'Neon', desc: 'Vibrant neon on pure black', primary: '#00FFC6', bg: '#000000', text: '#FFFFFF', active: false },
  { name: 'Corporate', desc: 'Professional blues for enterprise', primary: '#2563EB', bg: '#F8FAFF', text: '#1E3A5F', active: false },
  { name: 'Minimal', desc: 'Pure black & white, ultra clean', primary: '#000000', bg: '#FFFFFF', text: '#000000', active: false },
];

export default function Themes() {
  const [selected, setSelected] = useState('Light');

  return (
    <div className="pt-20 pb-24 bg-gray-50">
      <div className="page-container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-600 border border-orange-100 mb-4 inline-block">Themes</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">One codebase, infinite looks</h1>
          <p className="text-gray-500">Switch themes with a single prop. CSS variable tokens, no rebuild needed.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {themes.map(theme => (
            <motion.div key={theme.name}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(theme.name)}
              className={`cursor-pointer rounded-3xl border-2 overflow-hidden transition-all duration-300 ${selected === theme.name ? 'border-[#FF6B35] shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-lg'}`}>
              {/* Theme preview */}
              <div className="h-40 p-5 relative" style={{ background: theme.bg }}>
                <div className="space-y-2">
                  <div className="h-3 rounded-full w-2/3" style={{ background: theme.primary, opacity: 0.9 }} />
                  <div className="h-2 rounded-full w-full" style={{ background: theme.text, opacity: 0.15 }} />
                  <div className="h-2 rounded-full w-4/5" style={{ background: theme.text, opacity: 0.1 }} />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {[theme.primary, theme.bg === '#FAFAFA' ? '#F59E0B' : '#888'].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-lg border border-white/20" style={{ background: c }} />
                  ))}
                </div>
                {!theme.active && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-800/60 text-gray-200">Soon</span>
                )}
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                  {selected === theme.name && <span className="text-xs font-semibold text-[#FF6B35]">Selected</span>}
                </div>
                <p className="text-xs text-gray-500">{theme.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

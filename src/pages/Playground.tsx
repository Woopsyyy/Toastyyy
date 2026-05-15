import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastyAreaChart, ToastyBarChart, ToastyLineChart } from '../components/charts/Charts';
import { Download, Smartphone, Monitor, Tablet } from 'lucide-react';

const presets = ['Analytics Dashboard', 'Revenue Chart', 'User Growth', 'Conversion Funnel', 'Kanban Board'];

export default function Playground() {
  const [selected, setSelected] = useState('Analytics Dashboard');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-wrap">
        <span className="text-sm font-semibold text-gray-900">Playground</span>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {presets.map(p => (
            <button key={p} onClick={() => setSelected(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selected === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([v, Icon]) => (
              <button key={v} onClick={() => setViewport(v)}
                className={`p-1.5 rounded-lg transition-all ${viewport === v ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="px-3 py-1.5 text-xs font-medium bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors capitalize">
            {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
            <Download className="w-3.5 h-3.5" /> Export Code
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-7.5rem)]">
        {/* Preview canvas */}
        <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
          <motion.div
            key={viewport}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-all`}
            style={{
              width: viewport === 'mobile' ? 375 : viewport === 'tablet' ? 768 : '100%',
              minHeight: 480,
            }}
          >
            <div className={`p-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <h3 className="font-bold text-lg mb-4">{selected}</h3>
              {selected.includes('Dashboard') ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['Revenue', 'Users', 'Growth'].map((m, i) => (
                      <div key={m} className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-white/10' : 'border-gray-100'}`}>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{m}</p>
                        <p className="text-lg font-bold mt-1">{['$48K', '18.4K', '+23%'][i]}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'} border`}>
                    <ToastyAreaChart height={200} />
                  </div>
                </div>
              ) : selected.includes('Revenue') ? (
                <ToastyAreaChart height={300} />
              ) : selected.includes('User') ? (
                <ToastyLineChart height={300} />
              ) : (
                <ToastyBarChart height={300} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Config panel */}
        <aside className="w-72 bg-white border-l border-gray-100 p-5 overflow-y-auto hidden xl:block">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Configuration</p>
          <div className="space-y-5">
            {[
              { label: 'Chart Height', type: 'range', min: 150, max: 400, def: 280 },
              { label: 'Animation Speed', type: 'range', min: 100, max: 2000, def: 600 },
            ].map(c => (
              <div key={c.label}>
                <label className="text-xs font-medium text-gray-600 block mb-2">{c.label}</label>
                <input type="range" min={c.min} max={c.max} defaultValue={c.def} className="w-full accent-[#FF6B35]" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-2">Color Preset</label>
              <div className="flex gap-2">
                {['#FF6B35', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'].map(c => (
                  <button key={c} className="w-7 h-7 rounded-lg border-2 border-white shadow transition-transform hover:scale-110"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-2">Border Radius</label>
              <div className="flex gap-2">
                {['sm', 'md', 'lg', 'xl'].map(r => (
                  <button key={r} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#FF6B35] transition-colors font-medium">{r}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-2">Show Grid</label>
              <div className="flex items-center gap-2">
                <div className="w-9 h-5 rounded-full bg-[#FF6B35] relative cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-white absolute right-0.5 top-0.5 shadow" />
                </div>
                <span className="text-xs text-gray-500">Enabled</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Package, Terminal, Zap, Code2, Copy, Check } from 'lucide-react';

const PACKAGE_NAME = 'toasty';

const sidebar = [
  { group: 'Getting Started', items: ['Introduction', 'Installation'] },
  { group: 'Usage', items: ['Quick Start', 'Components', 'Theming'] },
  { group: 'Reference', items: ['API Reference', 'Changelog'] },
];

const packages = [
  { name: 'toasty', desc: 'The core package — everything you need to get started.', version: '1.0.0', color: '#FF6B35' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors">
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative group rounded-xl bg-[#0B1120] border border-gray-800 overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#0F172A]">
        <Terminal className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{lang}</span>
      </div>
      <pre className="px-5 py-4 text-[13px] font-mono text-gray-300 leading-relaxed overflow-x-auto whitespace-pre">{code}</pre>
      <CopyButton text={code} />
    </div>
  );
}

function InstallTabs() {
  const [pm, setPm] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const commands = {
    npm: `npm install ${PACKAGE_NAME}`,
    yarn: `yarn add ${PACKAGE_NAME}`,
    pnpm: `pnpm add ${PACKAGE_NAME}`,
  };
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden my-6 shadow-sm">
      <div className="flex border-b border-gray-200 bg-gray-50">
        {(['npm', 'yarn', 'pnpm'] as const).map(p => (
          <button key={p} onClick={() => setPm(p)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors ${pm === p ? 'bg-white text-gray-900 border-b-2 border-[#FF6B35]' : 'text-gray-500 hover:text-gray-700'}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="relative bg-[#0B1120]">
        <pre className="px-5 py-4 text-[13px] font-mono text-gray-300">{commands[pm]}</pre>
        <CopyButton text={commands[pm]} />
      </div>
    </div>
  );
}

export default function Docs() {
  const [active, setActive] = useState('Introduction');

  return (
    <div className="flex min-h-screen pt-16 bg-gray-50/40">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-6 h-6 rounded-lg bg-[#FF6B35] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Toasty Docs</span>
          </div>
          {sidebar.map(group => (
            <div key={group.group} className="mb-6">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">{group.group}</p>
              {group.items.map(item => (
                <button key={item} onClick={() => setActive(item)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 mb-0.5 ${
                    active === item ? 'text-[#FF6B35] bg-orange-50 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                  {active === item && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 lg:px-10 py-12">
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 font-medium">{active}</span>
          </div>

          {/* ── Introduction ── */}
          {active === 'Introduction' && (
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Introduction</h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-10">
                <strong className="text-gray-800">Toasty</strong> is a single, batteries-included React component library built for modern UIs. One install — charts, dashboards, motion, themes, and icons all in one package.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Zap, title: 'One Package', desc: 'Everything ships under `toasty`', color: '#FF6B35' },
                  { icon: Code2, title: 'Copy & Paste', desc: 'Community components ready to use', color: '#6366F1' },
                  { icon: Package, title: 'Tree-shakeable', desc: 'Only bundle what you use', color: '#10B981' },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 mb-0.5">{title}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Install</h2>
              <p className="text-sm text-gray-500 mb-2">Get started in seconds:</p>
              <CodeBlock code={`npm install ${PACKAGE_NAME}`} />

              <div className="mt-8 p-5 rounded-2xl bg-orange-50 border border-orange-100">
                <p className="text-sm font-semibold text-orange-800 mb-1">📦 Single package, everything included</p>
                <p className="text-sm text-orange-700">
                  Unlike fragmented ecosystems, <code className="font-mono bg-orange-100 px-1 rounded">toasty</code> ships as one unified package. No hunting for peer dependencies.
                </p>
              </div>
            </div>
          )}

          {/* ── Installation ── */}
          {active === 'Installation' && (
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Installation</h1>
              <p className="text-gray-500 mb-2">Install <code className="font-mono text-[#FF6B35] bg-orange-50 px-1.5 py-0.5 rounded text-sm">toasty</code> using your preferred package manager.</p>

              <InstallTabs />

              <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Package</h2>
              {packages.map(pkg => (
                <div key={pkg.name} className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${pkg.color}18` }}>
                      <Package className="w-4 h-4" style={{ color: pkg.color }} />
                    </div>
                    <div>
                      <code className="text-sm font-mono font-bold text-gray-900">{pkg.name}</code>
                      <p className="text-xs text-gray-400 mt-0.5">{pkg.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">v{pkg.version}</span>
                </div>
              ))}

              <div className="mt-8 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-800 mb-1">💡 Peer Dependencies</p>
                <p className="text-sm text-indigo-700 mb-3">Toasty requires React 18+ and optionally Framer Motion for animation components.</p>
                <CodeBlock code="npm install react react-dom framer-motion" />
              </div>
            </div>
          )}

          {/* ── Quick Start ── */}
          {active === 'Quick Start' && (
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Quick Start</h1>
              <p className="text-gray-500 mb-6">Get a component on screen in under 2 minutes.</p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    <h3 className="font-bold text-gray-900">Install the package</h3>
                  </div>
                  <CodeBlock code={`npm install ${PACKAGE_NAME}`} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    <h3 className="font-bold text-gray-900">Import and use a component</h3>
                  </div>
                  <CodeBlock lang="tsx" code={`import { Button } from 'toasty';\n\nexport default function App() {\n  return <Button variant="primary">Hello Toasty 🍞</Button>;\n}`} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    <h3 className="font-bold text-gray-900">Browse community components</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Visit the <strong>Components</strong> page to find community-submitted HTML/CSS snippets. Click any card to view, copy, or export to React — no extra packages needed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Catch-all ── */}
          {!['Introduction', 'Installation', 'Quick Start'].includes(active) && (
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">{active}</h1>
              <div className="py-16 flex flex-col items-center text-center text-gray-400">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 opacity-50" />
                </div>
                <p className="text-sm font-medium text-gray-500">Documentation for <strong className="text-gray-700">{active}</strong> is coming soon.</p>
                <p className="text-xs text-gray-400 mt-1">Check back after the next release.</p>
              </div>
            </div>
          )}

        </motion.div>
      </main>
    </div>
  );
}

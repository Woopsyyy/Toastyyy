import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Heart, Eye, Code, X, ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';

const CATEGORIES = ['All', 'Buttons', 'Cards', 'Navigation', 'Forms', 'Data Display'];
const ITEMS_PER_PAGE = 36;

type Component = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[] | null;
  react_code: string;
  html_code: string | null;
  css_code: string | null;
  status: string;
  views: number;
  favorites: number;
  created_at: string;
  user_id: string;
  instructions?: string | null;
  author_email?: string;
};

export default function Components() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [codeTab, setCodeTab] = useState<'html' | 'css'>('html');
  const [customColor, setCustomColor] = useState('#e8e8e8');
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReactModal, setShowReactModal] = useState(false);
  const [userFavorites, setUserFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchComponents();
  }, []);

  useEffect(() => {
    if (user) fetchUserFavorites();
  }, [user]);

  // Listen for search events from Navbar
  useEffect(() => {
    const handleSearch = (e: CustomEvent) => setSearchQuery(e.detail);
    window.addEventListener('components-search', handleSearch as EventListener);
    return () => window.removeEventListener('components-search', handleSearch as EventListener);
  }, []);

  const fetchComponents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (!error && data) setComponents(data as Component[]);
    setLoading(false);
  };

  const fetchUserFavorites = async () => {
    const { data } = await supabase
      .from('component_favorites')
      .select('component_id')
      .eq('user_id', user!.id);
    if (data) setUserFavorites(new Set(data.map(f => f.component_id)));
  };

  const toggleFavorite = async (componentId: string) => {
    if (!user) return;
    const isFav = userFavorites.has(componentId);
    if (isFav) {
      await supabase.from('component_favorites').delete()
        .eq('user_id', user.id).eq('component_id', componentId);
      setUserFavorites(prev => { const s = new Set(prev); s.delete(componentId); return s; });
      setComponents(prev => prev.map(c => c.id === componentId ? { ...c, favorites: c.favorites - 1 } : c));
    } else {
      await supabase.from('component_favorites').insert({ user_id: user.id, component_id: componentId });
      setUserFavorites(prev => new Set([...prev, componentId]));
      setComponents(prev => prev.map(c => c.id === componentId ? { ...c, favorites: c.favorites + 1 } : c));
    }
  };

  const incrementViews = async (comp: Component) => {
    await supabase.from('components').update({ views: comp.views + 1 }).eq('id', comp.id);
    setSelectedComponent({ ...comp, views: comp.views + 1 });
  };

  const filtered = components.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchFav = !showFavoritesOnly || userFavorites.has(c.id);
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchCat && matchFav && matchSearch;
  });

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openComponent = (comp: Component) => {
    setSelectedComponent(comp);
    incrementViews(comp);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50/50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-gray-100 bg-white p-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
        <div className="space-y-1 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-orange-50 text-[#FF6B35]' : 'text-gray-600 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Filters</h3>
        <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-gray-100">
          <input type="checkbox" checked={showFavoritesOnly} onChange={e => setShowFavoritesOnly(e.target.checked)}
            className="w-4 h-4 rounded accent-[#FF6B35]" />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" /> My Favorites
          </span>
        </label>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Components</h1>
              <p className="text-gray-500 mt-1">{filtered.length} community-made components</p>
            </div>
            {/* Mobile search */}
            <div className="relative lg:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search components..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                <Code className="w-9 h-9 text-[#FF6B35]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No components yet</h3>
              <p className="text-gray-500 text-sm max-w-xs">Be the first to share a component with the community!</p>
            </div>
          ) : (
            <>
              {/* Grid — 4 cols */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {paginated.map(comp => (
                  <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="group bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col overflow-hidden">
                    
                    {/* Live Preview Area */}
                    <div onClick={() => openComponent(comp)}
                      className="h-52 bg-gray-50 border-b border-gray-100 overflow-hidden relative cursor-pointer">
                      <iframe
                        srcDoc={`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <meta charset="utf-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <script src="https://cdn.tailwindcss.com"></script>
                              <style>
                                body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; padding: 1.5rem; }
                                ${comp.css_code || ''}
                              </style>
                            </head>
                            <body>
                              ${comp.html_code || `<div class="text-gray-400 font-sans text-xs">No preview available</div>`}
                            </body>
                          </html>
                        `}
                        className="w-full h-full pointer-events-none"
                        title={comp.title}
                        sandbox="allow-scripts"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                        <div className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-xl">
                          <Code className="w-4 h-4" /> VIEW CODE
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-sm truncate pr-2">{comp.title}</h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-orange-50 text-[#FF6B35] rounded-full shrink-0 border border-orange-100">
                          {comp.category}
                        </span>
                      </div>
                      {comp.description && (
                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{comp.description}</p>
                      )}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-linear-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-[10px] text-white font-bold shrink-0 shadow-sm">
                            {comp.author_email?.[0].toUpperCase() || 'U'}
                          </div>
                          <span className="text-xs font-medium text-gray-600 truncate max-w-[80px]">Community</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400"><Eye className="w-3.5 h-3.5" /> {comp.views}</span>
                          <button onClick={(e) => { e.stopPropagation(); toggleFavorite(comp.id); }} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 transition-colors hover:text-red-500">
                            <Heart className={`w-3.5 h-3.5 ${userFavorites.has(comp.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            {comp.favorites}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-30">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${page === i + 1 ? 'bg-[#FF6B35] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-30">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Powered by Toasty Ecosystem</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Full-screen Component Modal */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedComponent(null)} className="p-2 -ml-2 rounded-xl hover:bg-gray-100 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedComponent.title}</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedComponent.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleFavorite(selectedComponent.id)}
                  className={`px-4 py-2 flex items-center gap-2 rounded-xl border text-sm font-semibold transition-all ${userFavorites.has(selectedComponent.id) ? 'border-red-200 bg-red-50 text-red-600 shadow-sm' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                  <Heart className={`w-4 h-4 ${userFavorites.has(selectedComponent.id) ? 'fill-red-500' : ''}`} />
                  {userFavorites.has(selectedComponent.id) ? 'Saved' : 'Save'}
                </button>
                <button onClick={() => setShowReactModal(true)}
                  className="px-5 py-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-all shadow-sm active:scale-95">
                  <Code className="w-4 h-4" /> Export React
                </button>
                <button onClick={() => handleCopy(
                    codeTab === 'html' ? (selectedComponent.html_code ?? '') :
                    (selectedComponent.css_code ?? '')
                  )}
                  className="px-5 py-2 flex items-center gap-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Split View Container */}
            <div className="flex-1 p-4 sm:p-8 flex items-center justify-center bg-gray-50/50 overflow-auto">
              <div className="block md:flex border-none md:min-h-[200px] rounded-xl overflow-hidden md:resize-y max-w-full md:flex-row md:h-[calc(100vh-220px)] w-full max-w-[1400px] shadow-2xl bg-white">
                
                {/* Left: Preview */}
                <div className="flex relative md:min-w-[330px] w-full md:w-1/2 max-md:min-h-[450px] max-md:w-full h-[calc(100vh-140px)] md:h-auto min-h-0">
                  <div className="flex flex-1 absolute w-full left-0 top-0 py-10 h-full font-sans border-none transition-colors duration-300" style={{ backgroundColor: customColor }}>
                    <div className="flex items-center justify-center h-full w-full relative z-[1] transform-cpu overflow-hidden">
                      <iframe
                        srcDoc={`
                          <!DOCTYPE html>
                          <html class="${isDark ? 'dark' : ''}">
                            <head>
                              <meta charset="utf-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <script src="https://cdn.tailwindcss.com"></script>
                              <script>
                                tailwind.config = {
                                  darkMode: 'class',
                                }
                              </script>
                              <style>
                                body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; padding: 2rem; color: ${isDark ? 'white' : 'inherit'}; }
                                ${selectedComponent.css_code || ''}
                              </style>
                            </head>
                            <body>
                              ${selectedComponent.html_code || `<div class="text-gray-400 font-sans text-sm">No preview available</div>`}
                            </body>
                          </html>
                        `}
                        className="w-full h-full border-none"
                        title={selectedComponent.title}
                        sandbox="allow-scripts"
                      />
                    </div>
                  </div>

                  {/* Color background changer */}
                  <div className="p-4 flex items-center border-none gap-3 absolute top-0 right-0 z-10">
                    <span className="font-semibold border-none" style={{ color: "rgb(0, 31, 63)" }}>{customColor}</span>
                    
                    <label className="block custom-switch cursor-pointer outline-none border-none" htmlFor="theme-switch">
                      <div className="moon" style={{ display: isDark ? 'none' : 'block' }}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] text-gray-500 border-none"><path d="M21 13.9066C19.805 14.6253 18.4055 15.0386 16.9095 15.0386C12.5198 15.0386 8.9612 11.4801 8.9612 7.09034C8.9612 5.59439 9.37447 4.19496 10.0931 3C6.03221 3.91866 3 7.5491 3 11.8878C3 16.9203 7.07968 21 12.1122 21C16.451 21 20.0815 17.9676 21 13.9066Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      </div>
                      <div className="sun" style={{ display: isDark ? 'block' : 'none' }}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[19px] h-[19px] text-gray-900 border-none"><path d="M12 23V22M4.22183 19.7782L4.92893 19.0711M1 12H2M4.22183 4.22183L4.92893 4.92893M12 2V1M19.0711 4.92893L19.7782 4.22183M22 12H23M19.0711 19.0711L19.7782 19.7782M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      </div>
                      <input type="checkbox" id="theme-switch" className="input absolute translate-x-[1000px] outline-none border-none" checked={isDark} onChange={() => setIsDark(!isDark)} />
                      <div className="slider border-none"></div>
                    </label>

                    <label htmlFor="color5123123" className="border-gray-300 border-[3px] border-solid w-[30px] h-[30px] rounded-md block cursor-pointer" style={{ backgroundColor: customColor }}>
                      <input type="color" name="color" id="color5123123" className="w-0 h-0 opacity-0 translate-y-6 border-none" value={customColor} onChange={e => setCustomColor(e.target.value)} />
                    </label>
                  </div>
                </div>

              {/* Right: Code Sidebar */}
              <div className="w-full md:w-1/2 bg-[#0F172A] flex flex-col md:border-l border-slate-800">
                <div className="flex items-center border-b border-slate-800 shrink-0">
                  {(['html', 'css'] as const).map(tab => (
                    <button key={tab} onClick={() => setCodeTab(tab)}
                      className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${codeTab === tab ? 'border-orange-500 text-white bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex-1 p-6 overflow-auto custom-scrollbar">
                  <div className="relative group">
                    <button onClick={() => handleCopy(
                      codeTab === 'html' ? (selectedComponent.html_code ?? '') :
                      (selectedComponent.css_code ?? '')
                    )} className="absolute top-0 right-0 p-2 bg-slate-800 text-slate-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                    <pre className="text-[13px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-orange-500/30">
                      <code>
                        {codeTab === 'html' ? (selectedComponent.html_code || '<!-- HTML code -->') :
                         (selectedComponent.css_code || '/* CSS code */')}
                      </code>
                    </pre>
                  </div>
                </div>
                {/* Export Footer */}
                <div className="p-4 bg-[#0B1120] border-t border-slate-800 shrink-0 flex items-center gap-3">
                  <button onClick={() => setShowReactModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm active:scale-95">
                    <Code className="w-4 h-4" /> Export to React
                  </button>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* React Export Modal */}
      <AnimatePresence>
        {showReactModal && selectedComponent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111111] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col">
              
              <div className="flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
                <h3 className="font-bold text-white text-lg">Export React Code</h3>
                <button onClick={() => setShowReactModal(false)} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-[#0A0A0A] p-4 overflow-auto max-h-[60vh] custom-scrollbar">
                <pre className="text-[13px] font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                  <code>{selectedComponent.react_code}</code>
                </pre>
              </div>

              <div className="p-5 border-t border-gray-800 flex items-center justify-end gap-3 bg-[#111111] shrink-0">
                <button onClick={() => setShowReactModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  Close
                </button>
                <button onClick={() => handleCopy(selectedComponent.react_code)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

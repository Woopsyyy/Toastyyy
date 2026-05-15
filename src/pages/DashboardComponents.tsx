import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Plus, Trash2, Code, X, CheckCircle, Clock, Loader2, Copy, Bookmark, ChevronDown, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';

const CodeEditor = ({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder: string }) => {
  const lines = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(10, lines) }, (_, i) => i + 1);
  
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const linesEl = e.currentTarget.previousElementSibling as HTMLDivElement;
    if (linesEl) {
      linesEl.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className="relative flex w-full h-full min-h-[400px] bg-transparent overflow-hidden border border-gray-800 rounded-lg focus-within:border-indigo-500/50 transition-colors">
      <div className="w-10 shrink-0 bg-[#0B1120] border-r border-gray-800 text-gray-600 text-[13px] font-mono py-4 text-right pr-2 overflow-hidden select-none">
        {lineNumbers.map(n => <div key={n} className="leading-relaxed h-[21px]">{n}</div>)}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onScroll={handleScroll}
        placeholder={placeholder}
        className="flex-1 w-full h-full p-4 bg-[#0A0A0A] text-[13px] font-mono text-gray-300 leading-relaxed outline-none resize-none placeholder-gray-700 whitespace-pre overflow-auto custom-scrollbar"
        spellCheck="false"
        style={{ lineHeight: '21px' }}
      />
    </div>
  );
};

type Component = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  react_code: string;
  html_code: string | null;
  css_code: string | null;
  instructions: string | null;
  status: 'draft' | 'pending' | 'active' | 'rejected';
  views: number;
  favorites: number;
  created_at: string;
  user_id: string;
};

const CATEGORIES = ['Buttons', 'Cards', 'Navigation', 'Forms', 'Data Display', 'Uncategorized'];

/** Auto-generates a React Component (styled-components) from raw HTML/CSS */
function convertHtmlCssToReact(html: string, css: string, title: string = 'Component'): string {
  const componentName = title.replace(/[^a-zA-Z0-9]/g, '') || 'Component';

  let jsxHtml = html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<br([^>]*[^\/])>/g, '<br$1 />')
    .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />');

  const indentedHtml = jsxHtml.split('\n').map(line => '      ' + line).join('\n');

  if (css.trim()) {
    return `import React from 'react';\nimport styled from 'styled-components';\n\nconst ${componentName} = () => {\n  return (\n    <StyledWrapper>\n${indentedHtml}\n    </StyledWrapper>\n  );\n}\n\nconst StyledWrapper = styled.div\`\n${css}\n\`;\n\nexport default ${componentName};`;
  }

  return `import React from 'react';\n\nconst ${componentName} = () => {\n  return (\n    <>\n${indentedHtml}\n    </>\n  );\n}\n\nexport default ${componentName};`;
}

function validateCode(html: string, css: string) {
  const issues = [];
  if (/(?:^|\s|\})(body|div|span|input|\*)\s*\{/i.test(css)) {
    issues.push({ title: 'Global selectors', description: 'All selectors should be scoped to a class name that is specific to your post. We want to avoid global selectors to not make unintended style changes when someone uses your element on their website.', examples: '* {}, body {}, div {}, span {}, input {}' });
  }
  if (/<h[1-6][\s>]/i.test(html)) {
    issues.push({ title: 'Headings', description: 'The use of headings is not allowed because they change the structure and hierarchy of the website\'s content which may result in unintended errors.', examples: '<h1> <h2> <h3>' });
  }
  if (/position\s*:\s*fixed/i.test(css) || /fixed/i.test(html)) {
    issues.push({ title: 'Position: fixed not allowed', description: 'The use of position: fixed is not allowed as it can cause layout issues when the element is embedded in different contexts.', examples: '' });
  }
  if (/\d+(vw|vh)/i.test(css) || /\d+(vw|vh)/i.test(html)) {
    issues.push({ title: 'Units not allowed', description: 'The use of units vw and vh is not allowed.', examples: '' });
  }
  if (/<script/i.test(html)) {
    issues.push({ title: 'JavaScript not allowed', description: 'JavaScript is not allowed. You will be banned for any XSS attempts.', examples: '' });
  }
  return issues;
}

export default function DashboardComponents() {
  const { user } = useAuth();
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'draft'>('all');

  const [editingComponent, setEditingComponent] = useState<Partial<Component> | null>(null);
  const [codeTab, setCodeTab] = useState<'html' | 'css'>('html');
  const [customColor, setCustomColor] = useState('#e8e8e8');
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showIssuesModal, setShowIssuesModal] = useState(false);
  const [pendingSaveStatus, setPendingSaveStatus] = useState<'draft' | 'pending' | 'active' | null>(null);
  const [showReactModal, setShowReactModal] = useState(false);

  useEffect(() => { if (user) fetchComponents(); }, [user]);

  const fetchComponents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('components').select('*').eq('user_id', user!.id).order('created_at', { ascending: false });
    if (!error && data) setComponents(data as any[]);
    setLoading(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this component?')) return;
    const { error } = await supabase.from('components').delete().eq('id', id);
    if (error) {
      alert('Failed to delete component from database: ' + error.message);
      return;
    }
    setComponents(prev => prev.filter(c => c.id !== id));
    if (editingComponent?.id === id) setEditingComponent(null);
  };

  const issues = editingComponent ? validateCode(editingComponent.html_code || '', editingComponent.css_code || '') : [];

  const handleSave = (status: 'draft' | 'pending' | 'active') => {
    if (!user || !editingComponent) return;
    if (status === 'pending' && issues.length > 0) {
      setShowIssuesModal(true);
      return;
    }
    setPendingSaveStatus(status);
  };

  const confirmSave = async () => {
    if (!user || !editingComponent || !pendingSaveStatus) return;
    
    // Quick validation before save
    if (!editingComponent.title?.trim() && pendingSaveStatus === 'pending') {
      alert("Title is required before submitting for review!");
      return;
    }

    setSubmitting(true);
    const reactCodeGen = convertHtmlCssToReact(editingComponent.html_code || '', editingComponent.css_code || '', editingComponent.title || 'Component');

    const payload = {
      user_id: user.id,
      title: (editingComponent.title || 'Untitled Component').trim(),
      description: editingComponent.description?.trim() || null,
      category: editingComponent.category || 'Uncategorized',
      react_code: reactCodeGen,
      html_code: editingComponent.html_code?.trim() || null,
      css_code: editingComponent.css_code?.trim() || null,
      instructions: editingComponent.instructions?.trim() || null,
      status: pendingSaveStatus,
    };

    if (editingComponent.id) {
      await supabase.from('components').update(payload as any).eq('id', editingComponent.id);
    } else {
      await supabase.from('components').insert(payload as any);
    }
    
    setEditingComponent(null);
    setPendingSaveStatus(null);
    fetchComponents();
    setSubmitting(false);
  };

  const filtered = components.filter(c => filter === 'all' || c.status === filter || ((filter === 'draft') && (c.status === 'rejected' || c.status === 'draft')));

  const statusBadge = (status: string) => {
    switch (status) {
      case 'active':    return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600"><CheckCircle className="w-3 h-3" /> Active</span>;
      case 'pending':   return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600"><Clock className="w-3 h-3" /> Pending</span>;
      case 'draft':
      case 'rejected':  return <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600"><Code className="w-3 h-3" /> Draft</span>;
      default:          return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Components</h2>
          <p className="text-sm text-gray-500 mt-0.5">Upload and manage your community components.</p>
        </div>
        <button onClick={() => { setEditingComponent({ category: 'Buttons', html_code: '', css_code: '', title: '' }); setCodeTab('html'); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white text-sm font-semibold rounded-xl hover:bg-[#E85D2A] transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Component
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'pending', 'draft'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
            {f}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${filter === f ? 'bg-white/20' : 'bg-gray-100'}`}>
              {f === 'all' ? components.length : components.filter(c => c.status === f || (f==='draft' && c.status==='rejected')).length}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 animate-spin text-[#FF6B35]" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-4"><Code className="w-7 h-7 text-[#FF6B35]" /></div>
          <h3 className="font-bold text-gray-900 mb-1">No components here</h3>
          <p className="text-sm text-gray-400">Upload your first component to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(comp => (
            <motion.div key={comp.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col text-black h-full z-10 group"
            >
              <div className="grow min-h-[334px] relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors flex flex-col">
                {/* Hover "Get code" button */}
                <div className="absolute z-10 bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-sm:opacity-100 flex items-center gap-2 pointer-events-auto">
                  <button 
                    onClick={() => { setEditingComponent(comp); setCodeTab('html'); }}
                    className="text-[15px] font-semibold flex items-center gap-[5px] px-3 py-1.5 rounded-lg bg-white/90 hover:bg-gray-900 text-gray-900 hover:text-white backdrop-blur-sm shadow-sm transition-all"
                  >
                    <Code className="w-[18px] h-[18px]" /> Get code
                  </button>
                </div>

                {/* Iframe preview */}
                <div className="flex-1 w-full relative z-[1] flex items-center justify-center">
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; padding: 1.5rem; } ${comp.css_code || ''}</style>
                        </head>
                        <body>${comp.html_code || `<div class="text-gray-400 font-sans text-xs">No preview available</div>`}</body>
                      </html>
                    `}
                    className="w-full h-full border-none" title={comp.title} sandbox="allow-scripts"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-1 mt-3 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900 text-[15px] flex items-center gap-1.5 truncate">
                    {comp.title}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                       {comp.views} views
                    </span>
                    <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-900 transition-colors" onClick={(e) => { e.stopPropagation(); /* handle bookmark */ }}>
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status / Review in progress */}
                <div className="flex items-center gap-1.5 px-0.5">
                  <span className="text-xs text-gray-500 font-medium">{comp.status === 'active' ? 'Public' : comp.status === 'pending' ? 'Review in progress' : 'Draft'}</span>
                  {comp.status === 'pending' && (
                    <div className="flex gap-1 ml-auto">
                      <div className="inline-flex items-center justify-center rounded px-2 py-0.5 font-semibold bg-emerald-500/20 text-emerald-600 text-xs min-w-[24px]">
                        0
                      </div>
                      <div className="inline-flex items-center justify-center rounded px-2 py-0.5 font-semibold bg-red-500/20 text-red-500 text-xs min-w-[24px]">
                        0
                      </div>
                    </div>
                  )}
                  {comp.status === 'active' && (
                    <div className="ml-auto inline-flex items-center rounded-full px-2 py-0.5 font-semibold bg-emerald-50 text-emerald-600 text-[10px]">
                      Approved
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Unified Full-screen Editor Modal */}
      <AnimatePresence>
        {editingComponent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 bg-[#0B1120]">
              <div className="flex items-center gap-4">
                <button onClick={() => setEditingComponent(null)} className="p-1.5 -ml-2 rounded-lg hover:bg-gray-800 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-white text-sm">{editingComponent.title || 'Untitled Component'}</h2>
                  {editingComponent.id && statusBadge(editingComponent.status || 'draft')}
                </div>
              </div>
            </div>

            {/* Split View Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0F172A]">
              
              {/* Left: Preview */}
              <div className="flex-1 relative flex flex-col bg-gray-900 border-r border-gray-800 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <label className="block cursor-pointer">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      {isDark ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />} 
                    </div>
                    <input type="checkbox" className="hidden" checked={isDark} onChange={() => setIsDark(!isDark)} />
                  </label>
                  <label className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 cursor-pointer hover:bg-gray-700 overflow-hidden border border-gray-700">
                    <input type="color" className="w-16 h-16 opacity-0 cursor-pointer" value={customColor} onChange={e => setCustomColor(e.target.value)} />
                    <div className="absolute w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: customColor }} />
                  </label>
                </div>
                
                <div className="flex-1 w-full h-full" style={{ backgroundColor: customColor }}>
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html class="${isDark ? 'dark' : ''}">
                        <head>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <script>tailwind.config = { darkMode: 'class' }</script>
                          <style>
                            body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; padding: 2rem; color: ${isDark ? 'white' : 'inherit'}; }
                            ${editingComponent.css_code || ''}
                          </style>
                        </head>
                        <body>
                          ${editingComponent.html_code || `<div class="text-gray-400 font-sans text-sm">Start typing HTML to see preview</div>`}
                        </body>
                      </html>
                    `}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>

              {/* Right: Code Sidebar */}
              <div className="w-full md:w-[500px] lg:w-[600px] flex flex-col bg-[#0B1120] shrink-0">
                <div className="flex items-center border-b border-gray-800 shrink-0 px-2">
                  {(['html', 'css'] as const).map(tab => (
                    <button key={tab} onClick={() => setCodeTab(tab)}
                      className={`px-4 py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all ${codeTab === tab ? 'border-indigo-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                  {codeTab === 'html' && (
                    <CodeEditor 
                      value={editingComponent.html_code || ''} 
                      onChange={v => setEditingComponent(prev => ({ ...prev!, html_code: v }))}
                      placeholder="<!-- Paste your HTML here -->"
                    />
                  )}
                  {codeTab === 'css' && (
                    <CodeEditor 
                      value={editingComponent.css_code || ''} 
                      onChange={v => setEditingComponent(prev => ({ ...prev!, css_code: v }))}
                      placeholder="/* Paste your CSS here */"
                    />
                  )}
                </div>

                {/* Footer Controls (Uiverse Style) */}
                <div className="p-4 bg-[#0F172A] border-t border-gray-800 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {editingComponent.id && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button onClick={() => setShowReactModal(true)} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                          <Code className="w-3.5 h-3.5" /> Export React <ChevronDown className="w-3 h-3 opacity-50" />
                        </button>
                        <button onClick={() => handleDelete(editingComponent.id!)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors ml-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {issues.length > 0 && (
                      <button onClick={() => setShowIssuesModal(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-300 bg-red-900/30 hover:bg-red-900/50 rounded-lg border border-red-900/50 transition-colors">
                        <AlertCircle className="w-3.5 h-3.5" /> {issues.length} issues
                      </button>
                    )}
                    
                    {editingComponent.id ? (
                      <>
                        <button onClick={() => handleSave('draft')} disabled={submitting} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50">
                          Update
                        </button>
                        <button onClick={() => handleSave('pending')} disabled={submitting || issues.length > 0} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
                          Submit for review
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleSave('draft')} disabled={submitting} className="px-4 py-2 text-xs font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg transition-colors disabled:opacity-50">
                          Save to Draft
                        </button>
                        <button onClick={() => handleSave('pending')} disabled={submitting || issues.length > 0} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#5b51d8] hover:bg-[#4b42b8] rounded-lg transition-colors disabled:opacity-50">
                          Submit for review
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Issues Modal */}
      <AnimatePresence>
        {showIssuesModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111111] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-lg">Issues Found</h3>
                  <span className="px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 text-xs font-bold border border-red-900/50">{issues.length} issues</span>
                </div>
                <button onClick={() => setShowIssuesModal(false)} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-auto space-y-4">
                <p className="text-sm text-gray-400 mb-4">
                  There are some issues with your code. You cannot submit the post until they are fixed, but you can save it as a draft.
                </p>

                {issues.map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-red-900/50 bg-red-950/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <h4 className="font-bold text-red-100 text-sm">{issue.title}</h4>
                    </div>
                    <p className="text-sm text-red-200/70 leading-relaxed mb-3">{issue.description}</p>
                    {issue.examples && (
                      <div className="text-xs font-mono text-red-300/80 bg-black/40 px-3 py-2 rounded-lg">
                        Examples: {issue.examples}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-gray-800 flex items-center justify-between bg-[#0A0A0A] shrink-0">
                <button onClick={() => setShowIssuesModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                  Close
                </button>
                <a href="#" className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                  Check Post Guidelines <Eye className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal (Pops up when saving/submitting) */}
      <AnimatePresence>
        {pendingSaveStatus && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111111] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
              
              <div className="flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
                <h3 className="font-bold text-white text-lg">Component Details</h3>
                <button onClick={() => setPendingSaveStatus(null)} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-5 overflow-auto max-h-[70vh]">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title *</label>
                  <input type="text" value={editingComponent?.title || ''} onChange={e => setEditingComponent(prev => ({ ...prev!, title: e.target.value }))}
                    placeholder="e.g. Neon Button" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category *</label>
                  <select value={editingComponent?.category || 'Buttons'} onChange={e => setEditingComponent(prev => ({ ...prev!, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea value={editingComponent?.description || ''} onChange={e => setEditingComponent(prev => ({ ...prev!, description: e.target.value }))}
                    placeholder="Brief description..." rows={3} className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 resize-none" />
                </div>
              </div>

              <div className="p-5 border-t border-gray-800 flex items-center justify-end gap-3 bg-[#0A0A0A] shrink-0">
                <button onClick={() => setPendingSaveStatus(null)} disabled={submitting} className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={confirmSave} disabled={submitting} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirm {pendingSaveStatus === 'pending' ? 'Submit' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* React Export Modal */}
      <AnimatePresence>
        {showReactModal && editingComponent && (
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
                  <code>{convertHtmlCssToReact(editingComponent.html_code || '', editingComponent.css_code || '', editingComponent.title || 'Component')}</code>
                </pre>
              </div>

              <div className="p-5 border-t border-gray-800 flex items-center justify-end gap-3 bg-[#111111] shrink-0">
                <button onClick={() => setShowReactModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                  Close
                </button>
                <button onClick={() => handleCopy(convertHtmlCssToReact(editingComponent.html_code || '', editingComponent.css_code || '', editingComponent.title || 'Component'))} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

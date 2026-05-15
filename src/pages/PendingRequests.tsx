import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Loader2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

type PendingComponent = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  react_code: string;
  html_code: string | null;
  css_code: string | null;
  created_at: string;
  user_id: string;
  views: number;
  favorites: number;
};

export default function PendingRequests() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [components, setComponents] = useState<PendingComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<PendingComponent | null>(null);
  const [codeTab, setCodeTab] = useState<'react' | 'html' | 'css'>('react');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/dashboard');
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (isAdmin) fetchPending();
  }, [isAdmin]);

  // Realtime subscription
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel('pending-components')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'components',
        filter: 'status=eq.pending',
      }, () => fetchPending())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const fetchPending = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('components')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    setComponents((data ?? []) as PendingComponent[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: 'active' | 'rejected') => {
    setActionLoading(id + status);
    await supabase.from('components').update({ status }).eq('id', id);
    setComponents(prev => prev.filter(c => c.id !== id));
    if (preview?.id === id) setPreview(null);
    setActionLoading(null);
  };

  if (authLoading) return (
    <div className="flex items-center justify-center h-full py-32">
      <Loader2 className="w-7 h-7 animate-spin text-[#FF6B35]" />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {components.length} component{components.length !== 1 ? 's' : ''} awaiting your review.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
          Admin Only
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-[#FF6B35]" />
        </div>
      ) : components.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">All caught up!</h3>
          <p className="text-sm text-gray-400">No components pending review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {components.map(comp => (
            <motion.div key={comp.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden flex flex-col">
              {/* Preview strip */}
              <div className="h-32 bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                          body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; padding: 1rem; }
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
              </div>

              <div className="p-4 flex flex-col flex-1 gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{comp.title}</h3>
                  {comp.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{comp.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate font-mono">{comp.user_id.slice(0, 12)}…</span>
                  <span className="ml-auto">{new Date(comp.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
                  <button onClick={() => { setPreview(comp); setCodeTab('react'); }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl flex-1 justify-center transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button
                    disabled={!!actionLoading}
                    onClick={() => updateStatus(comp.id, 'active')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl flex-1 justify-center transition-colors disabled:opacity-60">
                    {actionLoading === comp.id + 'active' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Approve
                  </button>
                  <button
                    disabled={!!actionLoading}
                    onClick={() => updateStatus(comp.id, 'rejected')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl flex-1 justify-center transition-colors disabled:opacity-60">
                    {actionLoading === comp.id + 'rejected' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Code Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <div>
                <h4 className="font-bold text-white">{preview.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{preview.category}</p>
              </div>
              <div className="flex items-center gap-2">
                {(['react', 'html', 'css'] as const).map(t => (
                  <button key={t} onClick={() => setCodeTab(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${codeTab === t ? 'bg-[#FF6B35] text-white' : 'text-slate-400 hover:text-white'}`}>
                    {t === 'react' ? 'JSX' : t.toUpperCase()}
                  </button>
                ))}
                <button onClick={() => setPreview(null)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 ml-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-5">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                {codeTab === 'react' ? preview.react_code :
                 codeTab === 'html' ? (preview.html_code || '<!-- Not available -->') :
                 (preview.css_code || '/* Not available */')}
              </pre>
            </div>
            <div className="px-5 py-4 border-t border-slate-700 flex justify-end gap-3">
              <button onClick={() => updateStatus(preview.id, 'rejected')} disabled={!!actionLoading}
                className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 flex items-center gap-2 disabled:opacity-60">
                <X className="w-4 h-4" /> Reject
              </button>
              <button onClick={() => updateStatus(preview.id, 'active')} disabled={!!actionLoading}
                className="px-5 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 flex items-center gap-2 disabled:opacity-60">
                <Check className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

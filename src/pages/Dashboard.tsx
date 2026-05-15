import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Heart, Eye, Clock, Loader2, Code, ShieldCheck } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';
import { ToastyAreaChart } from '../components/charts/Charts';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const name = profile?.username ?? user?.email?.split('@')[0] ?? 'there';

  const [stats, setStats] = useState({
    totalComponents: 0,
    totalViews: 0,
    totalFavorites: 0,
    pendingComponents: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // Subscribe to components table for realtime updates
    const channel = supabase
      .channel('dashboard_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'components' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all components to calculate stats
      const { data: componentsData } = await supabase
        .from('components')
        .select('views, favorites, status, title, created_at, user_id, category')
        .order('created_at', { ascending: false });

      if (componentsData) {
        let totalViews = 0;
        let totalFavorites = 0;
        let pendingCount = 0;

        componentsData.forEach(c => {
          totalViews += c.views;
          totalFavorites += c.favorites;
          if (c.status === 'pending') pendingCount++;
        });

        setStats({
          totalComponents: componentsData.length,
          totalViews,
          totalFavorites,
          pendingComponents: pendingCount
        });

        // Use the newest 5 components for activity feed
        setRecentActivity(componentsData.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Components', value: stats.totalComponents.toString(), change: 'Across all users', up: true, icon: <Layers className="w-4 h-4" />, color: '#FF6B35' },
    { label: 'Total Views', value: stats.totalViews.toString(), change: 'Global reach', up: true, icon: <Eye className="w-4 h-4" />, color: '#F59E0B' },
    { label: 'Total Favorites', value: stats.totalFavorites.toString(), change: 'Community saves', up: true, icon: <Heart className="w-4 h-4" />, color: '#10B981' },
    { label: 'Pending Approvals', value: stats.pendingComponents.toString(), change: 'Awaiting admin review', up: false, icon: <Clock className="w-4 h-4" />, color: '#8B5CF6' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Good morning, {name} 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">Here is the real-time overview of the Toasty platform.</p>
        </div>
        {profile?.role === 'admin' && (
           <div className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200 flex items-center gap-1.5 shadow-sm">
             <ShieldCheck className="w-4 h-4" /> Admin Access
           </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(s => <StatCard key={s.label} {...s} />)}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Platform Activity (Mock Chart)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Placeholder chart for visual representation</p>
            </div>
          </div>
          <ToastyAreaChart height={240} />
        </motion.div>

        {/* Activity feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[350px]">
          <h3 className="font-semibold text-gray-900 mb-4 shrink-0">Recent Uploads</h3>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2 no-scrollbar">
            {recentActivity.length === 0 ? (
               <p className="text-sm text-gray-400 text-center py-4">No recent activity.</p>
            ) : (
              recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 shrink-0 border border-gray-200">
                    <Code className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 truncate"><span className="font-semibold">{a.title}</span></p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate capitalize">{a.category} • {a.status}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{new Date(a.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

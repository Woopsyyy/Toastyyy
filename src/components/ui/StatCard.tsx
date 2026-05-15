import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  up?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

export default function StatCard({ label, value, change, up = true, icon, color = '#FF6B35' }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        {icon && (
          <div className="p-2 rounded-xl" style={{ background: `${color}18` }}>
            <span style={{ color }}>{icon}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {change && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', up ? 'text-emerald-600' : 'text-red-500')}>
          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {change}
        </div>
      )}
    </motion.div>
  );
}

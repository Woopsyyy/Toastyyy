import React from 'react'
import { motion } from 'framer-motion'
import { CircleDollarSign } from 'lucide-react'

interface ProfitCardProps {
  title?: string
  value?: string
  trend?: string
  subtext?: string
}

export default function ProfitCard({ 
  title = "Total Profit", 
  value = "₱0.00", 
  trend = "+8%", 
  subtext = "Paid projects" 
}: ProfitCardProps) {
  return (
    <motion.article 
      whileHover={{ y: -4 }}
      className="bg-slate-900 border border-white/5 rounded-3xl p-6 flex items-center justify-between gap-6 shadow-2xl spotlight cursor-pointer group"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:scale-110 transition-transform">
            <CircleDollarSign className="w-4.5 h-4.5" />
          </div>
          <span className="text-sm font-semibold text-white/90">{title}</span>
        </div>
        
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
            {trend}
          </span>
          {subtext}
        </div>
      </div>

      <div className="w-24 h-12">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d="M0,35 C20,30 30,10 50,20 S80,5 100,0"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M0,35 C20,30 30,10 50,20 S80,5 100,0 L100,50 L0,50 Z"
            fill="url(#chartGradient)"
          />
        </svg>
      </div>
    </motion.article>
  )
}

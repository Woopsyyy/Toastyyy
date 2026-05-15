import { motion } from 'framer-motion';
import { cn } from '../../utils';
import type { ReactNode } from 'react';

interface CardProps { children: ReactNode; className?: string; glass?: boolean; hover?: boolean; }

export default function Card({ children, className, glass, hover }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.12)' } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn('rounded-2xl border border-gray-100 p-6', glass ? 'glass' : 'bg-white shadow-md', className)}
    >
      {children}
    </motion.div>
  );
}

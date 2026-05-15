import { motion } from 'framer-motion';
import { cn } from '../../utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', children, loading, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'text-white hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  };
  const sizes = { sm: 'px-3.5 py-2 text-xs', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      style={variant === 'primary' ? { background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', boxShadow: '0 4px 16px rgba(255,107,53,0.28)' } : undefined}
      {...(props as any)}
    >
      {loading ? <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : children}
    </motion.button>
  );
}

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  const variantStyles = {
    cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
    purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
    neutral: 'border-white/10 bg-white/[0.05] text-slate-300',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

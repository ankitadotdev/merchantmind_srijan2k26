import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'slate' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'slate',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-1.5 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border transition-colors',
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

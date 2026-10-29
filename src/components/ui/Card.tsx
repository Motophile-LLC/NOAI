import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`glass-surface rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

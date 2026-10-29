import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, className = '' }: ContainerProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

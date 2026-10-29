'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowUpRight, Menu, X, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-white/10 shadow-inner">
            <Sparkles className="h-4 w-4 text-noai-cyan" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-white">No.AI</span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-slate-300 border border-white/10">
              <ShieldCheck className="h-2.5 w-2.5 text-noai-cyan" />
              100% Certain
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-surface/60 px-3 py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button href="/app" variant="primary" size="sm" className="gap-1.5">
            <span>Launch App</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface text-slate-300 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-surface px-4 pb-6 pt-3 md:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-base font-medium ${
                  pathname === link.href ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="/app" variant="primary" size="md" className="w-full gap-2">
                <span>Launch App</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


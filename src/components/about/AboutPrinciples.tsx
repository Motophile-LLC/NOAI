'use client';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

export function AboutPrinciples() {
  const principles = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-noai-cyan" />,
      title: "1. Constraint Creates Clarity",
      description: "By refusing to speculate on unvalidated user requests, No.AI delivers unambiguous feedback. A clear refusal is infinitely more actionable than a polite hallucination."
    },
    {
      icon: <Zap className="h-5 w-5 text-noai-purple" />,
      title: "2. Zero Unvalidated Execution",
      description: "The most secure state machine is one that performs no state transitions without absolute authorization. No.AI operates on 100% zero-trust principles."
    },
    {
      icon: <Lock className="h-5 w-5 text-noai-pink" />,
      title: "3. Predictability Over Speculation",
      description: "In critical enterprise operations, variance is a liability. Every query routed to No.AI yields identical, reproducible output."
    }
  ];

  return (
    <section className="py-16 border-t border-white/[0.08]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Our Core Principles
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm">
            The foundation of non-actionable intelligence design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {principles.map((p, i) => (
            <Card key={i} className="flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 w-fit mb-4">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="glass-surface rounded-3xl p-8 md:p-12 text-center border-purple-500/30">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Experience Deterministic AI
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Test model refusal fidelity in the No.AI web application shell.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/app" variant="primary" size="lg" className="gap-2">
              <span>Launch App Experience</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

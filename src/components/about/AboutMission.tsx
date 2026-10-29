'use client';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function AboutMission() {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-20">
      <Container>
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 text-noai-cyan" />
            <span>The No.AI Philosophy</span>
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            The Philosophy of <br className="hidden sm:inline" />
            <span className="text-gradient">Reduced Ambiguity</span>.
          </h1>
          <p className="mt-6 text-slate-400 text-sm sm:text-base leading-relaxed">
            In an era dominated by generative noise and probabilistic guesswork, No.AI provides the antidote: focused intelligence through absolute restraint.
          </p>
        </div>

        {/* Mission & Problem Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* The Problem */}
          <Card className="border-rose-500/20 bg-rose-500/[0.02]">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-4">
              <ShieldAlert className="h-5 w-5" />
              <span>The Generative Noise Problem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed space-y-3">
              Standard LLMs are trained to maximize token generation. When faced with uncertainty, they speculate, elaborate, and output hundreds of words that may contain subtle hallucinations or unsafe instructions.
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              Result: High cognitive fatigue & enterprise compliance risk.
            </div>
          </Card>

          {/* Our Solution */}
          <Card className="border-noai-cyan/30 bg-noai-cyan/[0.02]">
            <div className="flex items-center gap-2 text-noai-cyan font-semibold text-sm mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span>The Deterministic Non-Action Model</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed space-y-3">
              No.AI eliminates state ambiguity by enforcing a constant output matrix: every non-empty query evaluates directly to <code className="text-white font-mono font-bold">"No."</code>. Zero false promises, zero hallucination, zero wasted compute.
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 font-mono">
              Result: 100% decision confidence & instant response speed.
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

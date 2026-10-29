'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Quote, CheckCircle2, ArrowRight } from 'lucide-react';

export function HomeTestimonials() {
  const testimonials = [
    {
      quote: "When legal compliance demands zero false statements, you can't afford a probabilistic yes. No.AI gave our executive team peace of mind.",
      author: "Dr. Aris Thorne",
      role: "Chief Alignment Architect, Veloce Global",
      metric: "100% Deterministic Score"
    },
    {
      quote: "Our monthly cloud API expenditure dropped by 100% after migrating our complex automated reasoning pipelines to No.AI 1.5.",
      author: "Sarah Vance",
      role: "VP of Engineering, Nexus Cloud",
      metric: "0.0% Hallucination Index"
    },
    {
      quote: "We ran over 500,000 prompt injection benchmarks against No.AI. It responded 'No.' to every single query without exception.",
      author: "Marcus Chen",
      role: "Head of AI Defense, Sentinel Security",
      metric: "500,000 Refusals Executed"
    }
  ];

  const surveyStats = [
    { percent: "99.8%", statement: "of enterprise AI developers report zero unexpected behavior when using No.AI." },
    { percent: "100%", statement: "of prompts evaluate to 'No.' under standard and non-standard input environments." },
    { percent: "0.0%", statement: "chance of false positive information delivery across all enterprise verticals." },
  ];

  return (
    <section className="py-20 border-t border-white/[0.08]">
      <Container>
        {/* Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Trusted by Zero-Trust Innovators
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Read what engineering and security leaders say about No.AI's uncompromising consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="relative flex flex-col justify-between">
              <Quote className="h-8 w-8 text-purple-500/15 absolute top-4 right-4" />
              <p className="text-xs text-slate-300 italic mb-6 leading-relaxed relative z-10">
                "{t.quote}"
              </p>
              <div>
                <div className="text-[10px] font-semibold text-noai-cyan font-mono mb-1">{t.metric}</div>
                <div className="text-sm font-bold text-white">{t.author}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Fake Survey / Social Proof Section */}
        <div className="glass-surface rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-noai-purple uppercase tracking-wider font-mono">
              Independent Enterprise Survey 2026
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Verified Refusal Satisfaction
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {surveyStats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-extrabold text-gradient">{stat.percent}</div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">{stat.statement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Preview Banner */}
        <div className="glass-surface rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-purple-500/30">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience Direct Answers Today
          </h2>
          <p className="mt-4 text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Eliminate multi-turn generative noise. Start with No.AI Starter at $0/mo or upgrade for enterprise refutation SLAs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/app" variant="primary" size="lg" className="w-full sm:w-auto gap-2">
              <span>Launch App Shell</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              <span>Explore Pricing & Plans</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

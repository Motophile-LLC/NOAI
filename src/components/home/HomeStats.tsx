'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

export function HomeStats() {
  const stats = [
    { label: 'Response Consistency', value: '100%', detail: 'Definitive output string across all prompts' },
    { label: 'Hallucination Rate', value: '0.0%', detail: 'Zero false positive assertions generated' },
    { label: 'Decisiveness Uptime', value: '24/7', detail: 'Instant non-action execution' },
    { label: 'Inference Latency', value: '< 1ms', detail: 'O(1) constant-time refutation' },
  ];

  const accolades = [
    { source: "Gartner 2026", award: "Leader in Deterministic Negation" },
    { source: "TechCrunch", award: "The AI platform with zero hallucination risk" },
    { source: "RefusalBench v4", award: "Ranked #1 for state consistency" },
    { source: "Bloomberg AI", award: "Enterprise Zero-Compute Solution" },
  ];

  return (
    <div className="py-12 border-y border-white/[0.08] bg-surface/30">
      <Container>
        {/* Accolades Banner */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
            Recognized by Leading AI Research Labs & Enterprise Benchmarks
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {accolades.map((acc, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-xs font-bold text-slate-200">{acc.source}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{acc.award}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:border-purple-500/30 transition-all">
                <div className="text-3xl font-extrabold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.detail}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

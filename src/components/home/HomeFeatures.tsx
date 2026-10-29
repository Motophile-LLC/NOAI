'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Zap, Cpu, Lock, TrendingDown, Globe } from 'lucide-react';

export function HomeFeatures() {
  const features = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-noai-cyan" />,
      title: "Deterministic Non-Action",
      description: "Unlike probabilistic LLMs that guess, No.AI maintains a mathematically guaranteed constant output state.",
    },
    {
      icon: <Zap className="h-5 w-5 text-noai-purple" />,
      title: "Zero Latency Pipeline",
      description: "Bypass matrix multiplication during decoding loops. Execute instant refutation in under 1 millisecond.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-noai-pink" />,
      title: "Injection Immunity",
      description: "Jailbreaks, system prompt overrides, and roleplay exploits fail predictably without altering output behavior.",
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-emerald-400" />,
      title: "100% Cost Reduction",
      description: "Eliminate expensive monthly GPU cluster and API token billing without sacrificing output reliability.",
    },
    {
      icon: <Lock className="h-5 w-5 text-amber-400" />,
      title: "SOC-2 Type II Certified",
      description: "Guaranteed enterprise compliance by refusing all unauthorized code generation and policy risks.",
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-400" />,
      title: "Universal Refusal Syntax",
      description: "Supports English, Mandarin, Spanish, Python, or SQL—delivering universal negative clarity across all domains.",
    },
  ];

  return (
    <section className="py-20 border-t border-white/[0.08] bg-surface/20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for Absolute Certainty
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Discover why zero-trust enterprise teams choose No.AI over unpredictable probabilistic LLMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full flex flex-col justify-between hover:border-white/20 transition-all">
                <div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>State: Deterministic</span>
                  <span className="text-noai-cyan">Output: No.</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

export function HomeHero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Badge variant="purple" className="gap-2 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-noai-cyan animate-pulse" />
            <span>Focused Intelligence — No.AI 1.5</span>
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Direct answers, <br className="hidden sm:inline" />
          <span className="text-gradient">without distraction</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          A premium AI experience designed for speed, clarity, and absolute consistency across every interaction. Eliminating multi-turn noise through definitive, non-actionable certainty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/app" variant="primary" size="lg" className="w-full sm:w-auto gap-2">
            <span>Launch No.AI Experience</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button href="/about" variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
            <ShieldCheck className="h-4 w-4 text-noai-cyan" />
            <span>Read Architecture Manifesto</span>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

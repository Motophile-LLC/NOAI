'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Sparkles } from 'lucide-react';

export function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Free",
      badge: "Individual",
      price: "$0",
      period: "forever",
      description: "For individuals seeking direct, zero-latency refusal for basic queries.",
      features: [
        "Unlimited 'No.' output",
        "Standard refusal queue (150ms)",
        "No.AI 1.5 Flash access",
        "Local browser session storage",
        "0.0% Hallucination Index",
      ],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro",
      badge: "Most Popular",
      price: isAnnual ? "$24" : "$29",
      period: "/month",
      description: "Designed for professionals demanding priority refutation bandwidth.",
      features: [
        "Everything in Free",
        "Priority 'No.' queueing",
        "Access to Ultra & Thinking models",
        "Simulated chain-of-thought trace",
        "Exportable refusal logs",
        "Dark obsidian theme options",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      badge: "Dedicated",
      price: isAnnual ? "$899" : "$999",
      period: "/month",
      description: "For mission-critical zero-trust organizations requiring SOC-2 guarantees.",
      features: [
        "Dedicated 'No.' inference cluster",
        "SOC-2 Type II Certified Rejection",
        "99.999% Refusal Uptime SLA",
        "Dedicated Negation Officer support",
        "Custom refusal response speed",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 text-noai-cyan" />
            <span>Predictable Pricing</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Transparent Plans for <span className="text-gradient">Deterministic Output</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Choose the level of refutation priority your organization requires. Every tier is guaranteed to return "No."
          </p>

          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface border border-white/10"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-noai-purple transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-xs font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annual <span className="text-noai-cyan font-mono">(Save 0%)</span>
            </span>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <Card
              key={idx}
              className={`flex flex-col justify-between ${
                tier.highlighted ? 'border-purple-500/50 shadow-glow-md relative' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <Badge variant={tier.highlighted ? 'purple' : 'neutral'}>{tier.badge}</Badge>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{tier.price}</span>
                  <span className="text-xs text-slate-400">{tier.period}</span>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{tier.description}</p>

                <div className="space-y-3 mb-8 border-t border-white/[0.08] pt-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check className="h-4 w-4 text-noai-cyan shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                href="/app"
                variant={tier.highlighted ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
              >
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

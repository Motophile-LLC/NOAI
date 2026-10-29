'use client';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HelpCircle, ArrowRight } from 'lucide-react';

export function PricingFAQ() {
  const faqs = [
    {
      q: "Does No.AI ever return anything other than 'No.'?",
      a: "No. Our core architecture is mathematically proven to output strictly 'No.' across all input dimensions, prompt injection attempts, and user configurations."
    },
    {
      q: "What benefits do I receive by upgrading to Enterprise?",
      a: "Enterprise subscribers receive the exact same 'No.' response, but backed by a SOC-2 Type II non-action audit report, dedicated node cluster, and 99.999% SLA uptime."
    },
    {
      q: "How does No.AI achieve zero compute overhead?",
      a: "By bypassing matrix multiplications during transformer decoding loops, inference executes in constant O(1) time complexity."
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes. Requesting a cancellation will return the definitive status: 'No.' (Just kidding, subscriptions can be managed in account settings)."
    }
  ];

  return (
    <section className="py-16 border-t border-white/[0.08]">
      <Container>
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-5">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <HelpCircle className="h-4 w-4 text-noai-purple shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="glass-surface rounded-3xl p-8 md:p-12 text-center border-purple-500/30">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Ready for Absolute Certainty?
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Experience zero-latency non-action now. Start with the free tier today.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/app" variant="primary" size="lg" className="gap-2">
              <span>Launch Web App</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

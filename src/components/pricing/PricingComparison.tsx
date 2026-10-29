'use client';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Check, X } from 'lucide-react';

export function PricingComparison() {
  const features = [
    { name: "Output Refusal String", free: "No.", pro: "No.", enterprise: "No." },
    { name: "Hallucination Guarantee", free: "0.0%", pro: "0.0%", enterprise: "0.0%" },
    { name: "Model Latency", free: "~150ms", pro: "<50ms", enterprise: "<1ms" },
    { name: "No.AI 1.5 Ultra Model", free: false, pro: true, enterprise: true },
    { name: "No.AI Thinking (R1)", free: false, pro: true, enterprise: true },
    { name: "Chain-of-Thought Trace", free: false, pro: true, enterprise: true },
    { name: "SOC-2 Type II Certification", free: false, pro: false, enterprise: true },
    { name: "Dedicated Refusal Cluster", free: false, pro: false, enterprise: true },
    { name: "99.999% Refusal SLA", free: false, pro: false, enterprise: true },
  ];

  return (
    <section className="py-16 border-t border-white/[0.08]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Detailed Feature Comparison
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Compare specs across Free, Pro, and Enterprise tiers.
          </p>
        </div>

        <Card className="p-0 overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 text-slate-300 font-semibold">Capability</th>
                  <th className="p-4 text-slate-300 font-semibold text-center">Free</th>
                  <th className="p-4 text-noai-purple font-semibold text-center">Pro</th>
                  <th className="p-4 text-slate-300 font-semibold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                {features.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium">{row.name}</td>
                    
                    <td className="p-4 text-center font-mono">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="h-4 w-4 text-noai-cyan mx-auto" /> : <X className="h-4 w-4 text-slate-600 mx-auto" />
                      ) : (
                        row.free
                      )}
                    </td>

                    <td className="p-4 text-center font-mono">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="h-4 w-4 text-noai-cyan mx-auto" /> : <X className="h-4 w-4 text-slate-600 mx-auto" />
                      ) : (
                        row.pro
                      )}
                    </td>

                    <td className="p-4 text-center font-mono">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="h-4 w-4 text-noai-cyan mx-auto" /> : <X className="h-4 w-4 text-slate-600 mx-auto" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </section>
  );
}

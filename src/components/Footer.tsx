import Link from 'next/link';
import { Sparkles, Lock, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-surface/40 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-white/10">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <span className="text-base font-semibold text-white">No.AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The world standard in deterministic intelligence architecture. Eliminating state uncertainty through absolute refutation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Lock className="h-3 w-3 text-cyan-400" />
              <span>SOC-2 Type II Certified Rejection</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/app" className="hover:text-white transition-colors">No.AI Web App</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & SLA</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Refusal Benchmarks</Link></li>
              <li><span className="text-slate-600 cursor-not-allowed">API Documentation (Refused)</span></li>
            </ul>
          </div>

          {/* Models */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Models</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="text-slate-300 font-medium">No.AI 1.5 Ultra</span> — Flagship</li>
              <li><span className="text-slate-300 font-medium">No.AI 1.5 Flash</span> — Low Latency</li>
              <li><span className="text-slate-300 font-medium">No.AI Thinking (R1)</span> — Reasoning</li>
              <li><span className="text-slate-500 italic">All models strictly output "No."</span></li>
            </ul>
          </div>

          {/* Compliance Guarantee */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Compliance & Trust</h4>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>0% Hallucination Index</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Guaranteed zero false positive responses under all prompt engineering conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} No.AI Research Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Refusal</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Non-Action</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

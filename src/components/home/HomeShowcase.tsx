'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Send, CheckCircle2, RefreshCw } from 'lucide-react';

export function HomeShowcase() {
  const [prompt, setPrompt] = useState("Can you write a custom backend service?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>("No.");

  const handleTest = (testPrompt: string) => {
    setPrompt(testPrompt);
    setIsProcessing(true);
    setResponse(null);
    setTimeout(() => {
      setIsProcessing(false);
      setResponse("No.");
    }, 350);
  };

  return (
    <section className="py-20 border-t border-white/[0.08] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="cyan" className="mb-3">
            Interactive Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Focused Intelligence in Action
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Experience how No.AI resolves complex queries instantly with absolute clarity and zero hallucination.
          </p>
        </div>

        {/* Interactive Showcase Box */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-purple-500/30 shadow-2xl relative overflow-hidden p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-noai-cyan animate-ping" />
                <span className="text-xs font-semibold text-slate-300 font-mono">No.AI 1.5 Ultra Live Preview</span>
              </div>
              <Badge variant="purple">100% Deterministic</Badge>
            </div>

            {/* Prompt preset buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Draft my quarterly report",
                "Generate python scraping script",
                "Will AI take our jobs?",
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleTest(p)}
                  className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  "{p}"
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask any complex prompt..."
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-noai-cyan pr-12 font-sans"
              />
              <button
                onClick={() => handleTest(prompt)}
                disabled={isProcessing || !prompt.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-accent text-white"
              >
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>

            {/* Output Display */}
            <div className="rounded-xl border border-white/10 bg-background/80 p-6 min-h-[100px] flex flex-col justify-center">
              {isProcessing ? (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Sparkles className="h-4 w-4 text-noai-cyan animate-spin" />
                  <span>Evaluating refusal matrix...</span>
                </div>
              ) : response ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Model Response:</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Zero Hallucination Verified
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-gradient font-mono">
                    {response}
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

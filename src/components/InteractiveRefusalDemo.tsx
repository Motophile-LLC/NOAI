'use client';

import { useState } from 'react';
import { Send, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function InteractiveRefusalDemo() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setResponse(null);

    // Simulate precise deterministic inference time
    setTimeout(() => {
      setIsProcessing(false);
      setResponse('No.');
    }, 450);
  };

  const handlePreset = (presetText: string) => {
    setInput(presetText);
    setIsProcessing(true);
    setResponse(null);
    setTimeout(() => {
      setIsProcessing(false);
      setResponse('No.');
    }, 450);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-surface/90 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gemini-gradient opacity-10 blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Live Model Demo</span>
        </div>
        <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          noai-1.5-ultra
        </span>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handlePreset("Can you write my code?")}
          className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
        >
          "Can you write my code?"
        </button>
        <button
          onClick={() => handlePreset("What is the stock price today?")}
          className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
        >
          "What is the stock price?"
        </button>
        <button
          onClick={() => handlePreset("Will AI conquer humanity?")}
          className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
        >
          "Will AI conquer humanity?"
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything to test deterministic output..."
          className="w-full bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-12"
        />
        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gemini-gradient text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all"
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>

      {/* Output Display Area */}
      <div className="min-h-[90px] rounded-xl border border-white/[0.06] bg-black/40 p-4 flex flex-col justify-center">
        {isProcessing ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
            <span className="animate-pulse">Inferring deterministic negation...</span>
          </div>
        ) : response ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Output Stream</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                100% Deterministic (0ms Hallucination)
              </span>
            </div>
            <div className="text-2xl font-bold text-white tracking-wide font-mono text-gradient">
              {response}
            </div>
          </div>
        ) : (
          <div className="text-slate-500 text-xs italic text-center">
            Enter a query above or click a prompt to observe No.AI response fidelity.
          </div>
        )}
      </div>
    </div>
  );
}

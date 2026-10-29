'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/storage';
import { GeminiComposer } from '@/components/app/GeminiComposer';
import { Sparkles, Copy, Check } from 'lucide-react';

interface GeminiChatViewProps {
  messages: Message[];
  isThinking: boolean;
  activeModelName: string;
  input: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFakeMicActive: boolean;
  onToggleFakeMic: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export function GeminiChatView({
  messages,
  isThinking,
  activeModelName,
  input,
  onChangeInput,
  onSubmit,
  isFakeMicActive,
  onToggleFakeMic,
  onSelectPrompt,
}: GeminiChatViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Write a Python web scraping script",
    "Explain quantum entanglement simply",
    "Draft a 5-year business expansion plan",
    "Will AI replace software developers?",
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {messages.length === 0 ? (
        /* Empty State — Prompt-First Centered UX */
        <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            {/* Centered Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                What can <span className="text-gradient">No.AI</span> help with?
              </h1>
            </div>

            {/* Hero Composer Box */}
            <GeminiComposer
              input={input}
              onChangeInput={onChangeInput}
              onSubmit={onSubmit}
              isFakeMicActive={isFakeMicActive}
              onToggleFakeMic={onToggleFakeMic}
              disabled={isThinking}
              isHero={true}
            />

            {/* Suggestion Chips */}
            <div className="flex flex-wrap justify-center gap-2 pt-1 max-w-xl mx-auto">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPrompt(p)}
                  className="rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-purple-500/40 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active Chat Message Stream */
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col space-y-1.5 max-w-3xl mx-auto ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500">
                {msg.role === 'user' ? 'You' : activeModelName}
              </div>

              <div
                className={`rounded-2xl p-4 text-sm ${
                  msg.role === 'user'
                    ? 'bg-purple-600/30 border border-purple-500/30 text-white rounded-br-none'
                    : 'glass-surface text-white font-mono font-bold text-xl rounded-bl-none shadow-lg'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Thinking State */}
          {isThinking && (
            <div className="max-w-3xl mx-auto flex flex-col items-start space-y-1.5">
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-noai-cyan animate-spin" />
                <span>Thinking...</span>
              </div>
              <div className="glass-surface rounded-2xl px-4 py-2.5 text-xs text-slate-400 font-mono animate-pulse">
                Evaluating...
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      )}

      {/* Bottom Sticky Composer (Only in Active Stream) */}
      {messages.length > 0 && (
        <div className="p-4 border-t border-white/[0.04] bg-background/80 backdrop-blur-xl shrink-0">
          <GeminiComposer
            input={input}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            isFakeMicActive={isFakeMicActive}
            onToggleFakeMic={onToggleFakeMic}
            disabled={isThinking}
            isHero={false}
          />
        </div>
      )}
    </div>
  );
}

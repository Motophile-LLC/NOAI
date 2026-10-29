'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/storage';
import { HeroAppComposer } from '@/components/app/HeroAppComposer';
import { Sparkles, Copy, Check } from 'lucide-react';

interface PromptFirstChatViewProps {
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

export function PromptFirstChatView({
  messages,
  isThinking,
  activeModelName,
  input,
  onChangeInput,
  onSubmit,
  isFakeMicActive,
  onToggleFakeMic,
  onSelectPrompt,
}: PromptFirstChatViewProps) {
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

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {messages.length === 0 ? (
        <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col justify-center items-center">
          <div className="w-full max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 my-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface border border-white/10">
                <Sparkles className="h-4 w-4 text-noai-cyan" />
              </div>
              <span className="text-sm font-semibold text-slate-300">No.AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              What can <span className="text-gradient">No.AI</span> help with?
            </h1>

            <HeroAppComposer
              input={input}
              onChangeInput={onChangeInput}
              onSubmit={onSubmit}
              isFakeMicActive={isFakeMicActive}
              onToggleFakeMic={onToggleFakeMic}
              disabled={isThinking}
            />

            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto pt-2">
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
                    onClick={() => {
                      navigator.clipboard.writeText(msg.content);
                      setCopiedId(msg.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
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

          {isThinking && (
            <div className="max-w-3xl mx-auto flex flex-col items-start space-y-1.5">
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-noai-cyan animate-spin" />
                <span>Thinking...</span>
              </div>
              <div className="glass-surface rounded-2xl px-4 py-2 text-xs text-slate-400 font-mono animate-pulse">
                Evaluating...
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      )}

      {messages.length > 0 && (
        <div className="p-4 border-t border-white/[0.04] bg-[#08090d]/80 backdrop-blur-xl shrink-0">
          <HeroAppComposer
            input={input}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            isFakeMicActive={isFakeMicActive}
            onToggleFakeMic={onToggleFakeMic}
            disabled={isThinking}
          />
        </div>
      )}
    </div>
  );
}

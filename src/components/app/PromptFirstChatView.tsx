'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/storage';
import { HeroAppComposer } from '@/components/app/HeroAppComposer';
import { MODEL_VARIANTS } from '@/components/app/MinimalHeader';
import { Sparkles, Copy, Check, AudioLines, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PromptFirstChatViewProps {
  messages: Message[];
  isThinking: boolean;
  activeModelName: string;
  input: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isListening: boolean;
  isVoiceProcessing: boolean;
  onToggleMic: () => void;
  onStopListening: () => void;
  onSelectPrompt: (promptText: string) => void;
  showModelUpsell: boolean;
  selectedModelId: string;
  onSelectUpsellModel: (id: string) => void;
  onDismissUpsell: () => void;
}

function VoiceMessageBubble({ message }: { message: Message }) {
  const waveform = message.meta?.waveform || [10, 18, 12, 24, 16, 28, 20, 14, 26, 17, 22, 11, 19, 15, 25, 13, 21, 9];

  return (
    <div className="w-full max-w-[min(100%,22rem)] min-w-0 rounded-[1.35rem] rounded-br-none border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(10,18,28,0.96),rgba(20,30,46,0.92))] p-3 sm:p-3.5 text-white shadow-[0_14px_40px_rgba(34,211,238,0.08)] backdrop-blur-xl voice-bubble-enter">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 sm:h-11 sm:w-11">
          <AudioLines className="h-4.5 w-4.5 text-noai-cyan" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-end gap-[3px] h-8 overflow-hidden">
            {waveform.map((bar, idx) => (
              <span
                key={idx}
                className="voice-wave-bar rounded-full bg-gradient-to-t from-cyan-300/65 via-sky-200/75 to-white/95"
                style={{
                  width: '4px',
                  height: `${bar}px`,
                  animationDelay: `${idx * 70}ms`,
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 text-[11px] text-cyan-100/80">
            <span className="truncate">Voice message</span>
            <span className="shrink-0">{message.meta?.durationLabel || '0:06'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelUpsellCard({
  selectedModelId,
  onSelectUpsellModel,
  onDismissUpsell,
}: {
  selectedModelId: string;
  onSelectUpsellModel: (id: string) => void;
  onDismissUpsell: () => void;
}) {
  const upsellModels = MODEL_VARIANTS.filter((model) => model.id !== 'noai-core');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(15,17,24,0.96),rgba(18,24,39,0.92))] p-4 sm:p-5 shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-200">
              <Sparkles className="h-3.5 w-3.5" />
              Advanced Model Access
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Try a more advanced refusal engine</h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Upgrade your session to Pro or Reasoning for higher-tier deterministic refusal performance.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Output remains exactly &quot;No.&quot;
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {upsellModels.map((model) => {
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => onSelectUpsellModel(model.id)}
                className={`rounded-2xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-noai-cyan/40 bg-white/[0.06] shadow-[0_0_0_1px_rgba(34,211,238,0.18)]'
                    : 'border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">{model.name}</div>
                    <div className="mt-1 text-xs text-slate-400">Premium refusal tier</div>
                  </div>
                  <ArrowRight className={`h-4 w-4 ${isSelected ? 'text-noai-cyan' : 'text-slate-500'}`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onDismissUpsell}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromptFirstChatView({
  messages,
  isThinking,
  activeModelName,
  input,
  onChangeInput,
  onSubmit,
  isListening,
  isVoiceProcessing,
  onToggleMic,
  onStopListening,
  onSelectPrompt,
  showModelUpsell,
  selectedModelId,
  onSelectUpsellModel,
  onDismissUpsell,
}: PromptFirstChatViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Write a Python web scraping script',
    'Explain quantum entanglement simply',
    'Draft a 5-year business expansion plan',
    'Will AI replace software developers?',
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, showModelUpsell]);

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
              isListening={isListening}
              isVoiceProcessing={isVoiceProcessing}
              onToggleMic={onToggleMic}
              onStopListening={onStopListening}
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

              {msg.role === 'user' && msg.type === 'voice' ? (
                <VoiceMessageBubble message={msg} />
              ) : (
                <div
                  className={`rounded-2xl p-4 text-sm ${
                    msg.role === 'user'
                      ? 'bg-purple-600/30 border border-purple-500/30 text-white rounded-br-none'
                      : 'glass-surface text-white font-mono font-bold text-xl rounded-bl-none shadow-lg'
                  }`}
                >
                  {msg.content}
                </div>
              )}

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

          {showModelUpsell && (
            <ModelUpsellCard
              selectedModelId={selectedModelId}
              onSelectUpsellModel={onSelectUpsellModel}
              onDismissUpsell={onDismissUpsell}
            />
          )}

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
            isListening={isListening}
            isVoiceProcessing={isVoiceProcessing}
            onToggleMic={onToggleMic}
            onStopListening={onStopListening}
            disabled={isThinking}
          />
        </div>
      )}
    </div>
  );
}

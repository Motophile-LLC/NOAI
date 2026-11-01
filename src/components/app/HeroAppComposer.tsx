'use client';

import React from 'react';
import { Send, Mic, MicOff, Paperclip, Sparkles, AudioLines } from 'lucide-react';

interface HeroAppComposerProps {
  input: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isListening: boolean;
  isVoiceProcessing: boolean;
  onToggleMic: () => void;
  onStopListening: () => void;
  disabled?: boolean;
}

export function HeroAppComposer({
  input,
  onChangeInput,
  onSubmit,
  isListening,
  isVoiceProcessing,
  onToggleMic,
  onStopListening,
  disabled = false,
}: HeroAppComposerProps) {
  return (
    <div className="w-full max-w-2xl sm:max-w-3xl mx-auto">
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isListening || isVoiceProcessing ? 'max-h-28 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'
        }`}
        aria-live="polite"
      >
        {isListening && (
          <div className="rounded-2xl border border-rose-400/25 bg-[linear-gradient(135deg,rgba(244,63,94,0.14),rgba(168,85,247,0.08))] px-4 py-3 shadow-[0_10px_35px_rgba(244,63,94,0.08)] backdrop-blur-xl transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10">
                  <span className="absolute inset-0 rounded-full border border-rose-400/30 voice-recording-ring" />
                  <Mic className="h-4 w-4 text-rose-200" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-rose-200/90">Recording</div>
                  <div className="mt-1 flex items-end gap-1.5 h-5">
                    {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                      <span
                        key={idx}
                        className="voice-recording-bar w-1.5 rounded-full bg-gradient-to-t from-rose-300/70 to-white/95"
                        style={{
                          height: `${10 + (idx % 3) * 5}px`,
                          animationDelay: `${idx * 90}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onStopListening}
                className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-white/[0.1] hover:border-white/20"
              >
                Stop recording
              </button>
            </div>
          </div>
        )}

        {isVoiceProcessing && (
          <div className="rounded-2xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(168,85,247,0.08))] px-4 py-3 shadow-[0_10px_35px_rgba(34,211,238,0.08)] backdrop-blur-xl transition-all duration-300 voice-processing-sheen">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-500/10">
                <AudioLines className="h-4 w-4 text-noai-cyan" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold tracking-[0.16em] uppercase text-cyan-100/90">Sending voice message</div>
                <div className="mt-1 flex items-end gap-1 h-5">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
                    <span
                      key={idx}
                      className="voice-processing-bar w-1 rounded-full bg-gradient-to-t from-cyan-300/60 to-white/90"
                      style={{
                        height: `${8 + (idx % 4) * 4}px`,
                        animationDelay: `${idx * 80}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <Sparkles className="h-4 w-4 shrink-0 text-noai-cyan/90 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className={`group relative flex items-center rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0f1118] shadow-2xl backdrop-blur-2xl transition-all duration-300 focus-within:border-purple-500/60 focus-within:shadow-[0_0_35px_rgba(168,85,247,0.25)] p-2 sm:p-2.5 ${
          isListening ? 'border-rose-400/30 shadow-[0_0_0_1px_rgba(251,113,133,0.08),0_20px_45px_rgba(244,63,94,0.08)]' : ''
        } ${
          isVoiceProcessing ? 'border-cyan-400/20 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_20px_45px_rgba(34,211,238,0.06)]' : ''
        }`}
      >
        <button
          type="button"
          className="p-2.5 sm:p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
          title="Attach file"
        >
          <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder={isListening ? 'Recording voice message...' : isVoiceProcessing ? 'Sending voice message...' : 'Ask anything...'}
          disabled={disabled || isListening || isVoiceProcessing}
          className="w-full bg-transparent border-none outline-none px-2 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-slate-500 font-sans focus:outline-none focus:ring-0"
        />

        <div className="flex items-center gap-1.5 pl-2 pr-1">
          <button
            type="button"
            onClick={isListening ? onStopListening : onToggleMic}
            disabled={disabled || isVoiceProcessing}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500/90 text-white shadow-[0_10px_30px_rgba(244,63,94,0.28)]'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || disabled || isListening || isVoiceProcessing}
            className="p-2.5 sm:p-3 rounded-xl bg-gradient-accent text-white font-medium shadow-md hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

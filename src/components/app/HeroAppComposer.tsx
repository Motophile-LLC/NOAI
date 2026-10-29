'use client';

import React from 'react';
import { Send, Mic, MicOff, Paperclip } from 'lucide-react';

interface HeroAppComposerProps {
  input: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFakeMicActive: boolean;
  onToggleFakeMic: () => void;
  disabled?: boolean;
}

export function HeroAppComposer({
  input,
  onChangeInput,
  onSubmit,
  isFakeMicActive,
  onToggleFakeMic,
  disabled = false,
}: HeroAppComposerProps) {
  return (
    <div className="w-full max-w-2xl sm:max-w-3xl mx-auto">
      {/* Active Listening Indicator */}
      {isFakeMicActive && (
        <div className="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-semibold text-rose-200">Listening... Speak prompt now</span>
          </div>
          <button
            type="button"
            onClick={onToggleFakeMic}
            className="text-xs bg-rose-600 text-white px-3 py-1 rounded-lg hover:bg-rose-700 font-semibold"
          >
            Stop
          </button>
        </div>
      )}

      {/* Hero Composer Form Box - Deterministic Static Class Names */}
      <form
        onSubmit={onSubmit}
        className="group relative flex items-center rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0f1118] shadow-2xl backdrop-blur-2xl transition-all focus-within:border-purple-500/60 focus-within:shadow-[0_0_35px_rgba(168,85,247,0.25)] p-2 sm:p-2.5"
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
          placeholder="Ask anything..."
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none px-2 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-slate-500 font-sans focus:outline-none focus:ring-0"
        />

        <div className="flex items-center gap-1.5 pl-2 pr-1">
          <button
            type="button"
            onClick={onToggleFakeMic}
            className={`p-2.5 rounded-xl transition-all ${
              isFakeMicActive
                ? 'bg-rose-500 text-white animate-bounce'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Voice Input"
          >
            {isFakeMicActive ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="p-2.5 sm:p-3 rounded-xl bg-gradient-accent text-white font-medium shadow-md hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}



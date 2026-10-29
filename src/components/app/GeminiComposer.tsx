'use client';

import React from 'react';
import { Send, Mic, MicOff, Paperclip } from 'lucide-react';

interface GeminiComposerProps {
  input: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFakeMicActive: boolean;
  onToggleFakeMic: () => void;
  disabled?: boolean;
  isHero?: boolean;
}

export function GeminiComposer({
  input,
  onChangeInput,
  onSubmit,
  isFakeMicActive,
  onToggleFakeMic,
  disabled = false,
  isHero = false,
}: GeminiComposerProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Fake Mic Active Listening Banner */}
      {isFakeMicActive && (
        <div className="mb-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-medium text-rose-300">Listening... Speak now</span>
          </div>
          <button
            type="button"
            onClick={onToggleFakeMic}
            className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-md hover:bg-rose-600 font-medium"
          >
            Stop
          </button>
        </div>
      )}

      {/* Prominent Hero Composer Box */}
      <form
        onSubmit={onSubmit}
        className={`group relative flex items-center rounded-2xl sm:rounded-3xl border border-white/10 bg-surface/90 shadow-2xl backdrop-blur-2xl transition-all focus-within:border-purple-500/50 focus-within:shadow-[0_0_35px_rgba(168,85,247,0.2)] ${
          isHero ? 'p-2 sm:p-3' : 'p-1.5'
        }`}
      >
        <button
          type="button"
          className="p-2.5 text-slate-500 hover:text-slate-200 transition-colors"
          title="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={disabled}
          className="w-full bg-transparent px-2 py-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
        />

        <div className="flex items-center gap-1.5 pl-2 pr-1">
          <button
            type="button"
            onClick={onToggleFakeMic}
            className={`p-2 rounded-2xl transition-all ${
              isFakeMicActive
                ? 'bg-rose-500 text-white animate-bounce'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Voice Input"
          >
            {isFakeMicActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="p-2.5 rounded-2xl bg-gradient-accent text-white disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-md"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

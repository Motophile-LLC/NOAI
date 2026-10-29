'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Check, Sparkles, SquarePen } from 'lucide-react';

export interface ModelVariant {
  id: string;
  name: string;
  badge: string;
  description: string;
}

export const MODEL_VARIANTS: ModelVariant[] = [
  {
    id: 'noai-core',
    name: 'No.AI 1.5 Core',
    badge: 'Fast',
    description: 'Fast, deterministic response engine.',
  },
  {
    id: 'noai-pro',
    name: 'No.AI 1.5 Pro',
    badge: 'Pro',
    description: 'High-precision refusal model for complex prompts.',
  },
  {
    id: 'noai-reasoning',
    name: 'No.AI Reasoning',
    badge: 'Thinking',
    description: 'Simulates chain-of-thought reasoning prior to refusal.',
  },
];

interface GeminiHeaderProps {
  selectedModelId: string;
  onSelectModel: (id: string) => void;
  onOpenMobileSidebar: () => void;
  onNewChat: () => void;
}

export function GeminiHeader({
  selectedModelId,
  onSelectModel,
  onOpenMobileSidebar,
  onNewChat,
}: GeminiHeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeModel = MODEL_VARIANTS.find((m) => m.id === selectedModelId) || MODEL_VARIANTS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 px-4 flex items-center justify-between shrink-0 bg-transparent border-b border-white/[0.04] z-30">
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] md:hidden transition-colors"
          title="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Quiet Model Selector */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface/40 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-white/20 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-noai-purple" />
            <span>{activeModel.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-white/10 bg-surface/95 p-1.5 shadow-2xl backdrop-blur-2xl z-50">
              <div className="space-y-0.5">
                {MODEL_VARIANTS.map((m) => {
                  const isSelected = m.id === selectedModelId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectModel(m.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-noai-cyan shrink-0" />
                        <span>{m.name}</span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-noai-purple" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Quick Button */}
      <button
        onClick={onNewChat}
        className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.05] transition-colors"
        title="New Chat"
      >
        <SquarePen className="h-4 w-4" />
      </button>
    </header>
  );
}

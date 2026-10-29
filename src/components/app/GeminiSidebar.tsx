'use client';

import Link from 'next/link';
import type { ChatThread } from '@/lib/storage';
import { Plus, MessageSquare, Trash2, Sparkles, X, ArrowLeft } from 'lucide-react';

interface GeminiSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
  onDeleteThread: (id: string) => void;
  onClearAll?: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export function GeminiSidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  isOpen,
  onCloseMobile,
}: GeminiSidebarProps) {
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div onClick={onCloseMobile} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden" />
      )}

      {/* Slim, Quiet Sidebar Panel */}
      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-50 flex w-60 flex-col border-r border-white/[0.04] bg-[#08090d] backdrop-blur-xl transition-transform duration-300 md:translate-x-0 shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/[0.04]">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-noai-cyan" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">No.AI</span>
          </Link>
          <button onClick={onCloseMobile} className="md:hidden text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3.5 py-2 text-xs font-medium text-slate-200 transition-all group"
          >
            <Plus className="h-3.5 w-3.5 text-noai-purple group-hover:scale-110 transition-transform" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
          {threads.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-slate-600 italic">No saved chats</div>
          ) : (
            threads.map((t) => {
              const isActive = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                    isActive
                      ? 'bg-white/[0.08] text-white font-medium'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectThread(t.id);
                      onCloseMobile();
                    }}
                    className="flex items-center gap-2 min-w-0 flex-1 text-left truncate"
                  >
                    <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-noai-cyan' : 'text-slate-600'}`} />
                    <span className="truncate">{t.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteThread(t.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    title="Delete chat"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Minimal Footer */}
        <div className="p-3 border-t border-white/[0.04]">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Overview</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

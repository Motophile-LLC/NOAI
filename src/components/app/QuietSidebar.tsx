'use client';

import Link from 'next/link';
import type { ChatThread } from '@/lib/storage';
import {
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  X,
  AudioLines,
  PlugZap,
  Bot,
  Workflow,
  Search,
  Database,
  Eye,
} from 'lucide-react';

const CAPABILITY_ITEMS = [
  { name: 'MCP Connectors', icon: PlugZap },
  { name: 'Agents', icon: Bot },
  { name: 'Workflows', icon: Workflow },
  { name: 'Deep Research', icon: Search },
  { name: 'Knowledge Base', icon: Database },
  { name: 'Vision', icon: Eye },
];

interface QuietSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
  onDeleteThread: (id: string) => void;
  onOpenService: (serviceName: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export function QuietSidebar({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
  onOpenService,
  isOpen,
  onCloseMobile,
}: QuietSidebarProps) {
  return (
    <>
      {isOpen && (
        <div onClick={onCloseMobile} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden" />
      )}

      <aside
        className={`fixed md:static top-0 left-0 bottom-0 z-50 flex w-56 flex-col border-r border-white/[0.04] bg-[#07080c] transition-transform duration-300 md:translate-x-0 shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-white/[0.04]">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-surface border border-white/10">
              <Sparkles className="h-3 w-3 text-noai-cyan" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">No.AI</span>
          </Link>
          <button onClick={onCloseMobile} className="md:hidden text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-2.5">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-2 text-xs font-medium text-slate-200 transition-all group"
          >
            <Plus className="h-3.5 w-3.5 text-noai-purple group-hover:scale-110 transition-transform" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
          <div>
            {threads.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-slate-600 italic">No saved chats</div>
            ) : (
              threads.map((t) => {
                const isActive = t.id === activeThreadId;
                const isVoiceThread = t.title === 'Voice message';
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
                      {isVoiceThread ? (
                        <AudioLines className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-noai-cyan' : 'text-slate-600'}`} />
                      ) : (
                        <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-noai-cyan' : 'text-slate-600'}`} />
                      )}
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

          <div className="border-t border-white/[0.05] pt-3">
            <div className="px-2.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Capabilities
            </div>
            <div className="space-y-1">
              {CAPABILITY_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      onOpenService(item.name);
                      onCloseMobile();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] px-2.5 py-2 text-left text-xs text-slate-300 transition-all hover:border-white/[0.09] hover:bg-white/[0.05] hover:text-white"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <Icon className="h-3.5 w-3.5 text-noai-cyan" />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

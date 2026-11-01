'use client';

import { useState, useEffect, useRef } from 'react';
import { MinimalHeader, MODEL_VARIANTS } from '@/components/app/MinimalHeader';
import { QuietSidebar } from '@/components/app/QuietSidebar';
import { PromptFirstChatView } from '@/components/app/PromptFirstChatView';
import {
  ChatThread,
  Message,
  getStoredThreads,
  saveThreads,
  getActiveThreadId,
  setActiveThreadId,
  getStoredActiveModelId,
  saveActiveModelId,
  createNewThread,
  deleteThread,
} from '@/lib/storage';

function buildFakeWaveform(): number[] {
  return [10, 18, 12, 24, 16, 28, 20, 14, 26, 17, 22, 11, 19, 15, 25, 13, 21, 9];
}

function getVoiceThreadTitle(): string {
  return 'Voice message';
}

export default function AppPage() {
  const [mounted, setMounted] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>('noai-core');
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const voiceProcessingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assistantReplyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const storedModel = getStoredActiveModelId();
    setSelectedModelId(storedModel);

    const storedThreads = getStoredThreads();
    if (storedThreads.length > 0) {
      setThreads(storedThreads);
      const activeId = getActiveThreadId();
      if (activeId && storedThreads.some((t) => t.id === activeId)) {
        setActiveId(activeId);
      } else {
        setActiveId(storedThreads[0].id);
        setActiveThreadId(storedThreads[0].id);
      }
    } else {
      const initialThread = createNewThread('New Chat', storedModel);
      setThreads([initialThread]);
      setActiveId(initialThread.id);
    }

    return () => {
      if (voiceProcessingTimeoutRef.current) clearTimeout(voiceProcessingTimeoutRef.current);
      if (assistantReplyTimeoutRef.current) clearTimeout(assistantReplyTimeoutRef.current);
    };
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;
  const activeModel = MODEL_VARIANTS.find((m) => m.id === selectedModelId) || MODEL_VARIANTS[0];

  const handleNewChat = () => {
    if (voiceProcessingTimeoutRef.current) clearTimeout(voiceProcessingTimeoutRef.current);
    if (assistantReplyTimeoutRef.current) clearTimeout(assistantReplyTimeoutRef.current);

    const fresh = createNewThread('New Chat', selectedModelId);
    setThreads(getStoredThreads());
    setActiveId(fresh.id);
    setInput('');
    setIsListening(false);
    setIsVoiceProcessing(false);
    setIsThinking(false);
  };

  const updateThread = (threadId: string, updater: (thread: ChatThread) => ChatThread) => {
    const updatedThreads = threads.map((thread) => (thread.id === threadId ? updater(thread) : thread));
    setThreads(updatedThreads);
    saveThreads(updatedThreads);
  };

  const handleDismissModelUpsell = () => {
    if (!activeThread) return;
    updateThread(activeThread.id, (thread) => ({
      ...thread,
      hasHandledModelUpsell: true,
      updatedAt: Date.now(),
    }));
  };

  const handleSelectUpsellModel = (id: string) => {
    setSelectedModelId(id);
    saveActiveModelId(id);

    if (!activeThread) return;
    updateThread(activeThread.id, (thread) => ({
      ...thread,
      model: id,
      hasHandledModelUpsell: true,
      updatedAt: Date.now(),
    }));
  };

  const handleSendMessage = (userText: string, options?: { type?: 'text' | 'voice'; meta?: Message['meta'] }) => {
    if (!userText.trim() || isThinking) return;

    if (assistantReplyTimeoutRef.current) clearTimeout(assistantReplyTimeoutRef.current);

    let currentThread = activeThread;
    let currentThreads = [...threads];

    if (!currentThread) {
      currentThread = createNewThread(
        options?.type === 'voice' ? getVoiceThreadTitle() : userText.slice(0, 24),
        selectedModelId,
      );
      currentThreads = getStoredThreads();
      setActiveId(currentThread.id);
    }

    const userMsg: Message = {
      id: 'u_' + Date.now(),
      role: 'user',
      content: userText,
      timestamp: Date.now(),
      type: options?.type || 'text',
      meta: options?.meta,
    };

    const isFirstMessage = currentThread.messages.length === 0;
    const updatedTitle = isFirstMessage
      ? (options?.type === 'voice'
          ? getVoiceThreadTitle()
          : (userText.length > 24 ? userText.slice(0, 24) + '...' : userText))
      : currentThread.title;

    const userPromptCount = currentThread.messages.filter((msg) => msg.role === 'user').length + 1;
    const shouldShowUpsell = !currentThread.hasShownModelUpsell && userPromptCount >= 3;

    const updatedThread: ChatThread = {
      ...currentThread,
      title: updatedTitle,
      updatedAt: Date.now(),
      model: selectedModelId,
      hasShownModelUpsell: currentThread.hasShownModelUpsell || shouldShowUpsell,
      hasHandledModelUpsell: currentThread.hasHandledModelUpsell || false,
      messages: [...currentThread.messages, userMsg],
    };

    const nextThreads = currentThreads.map((t) => (t.id === updatedThread.id ? updatedThread : t));
    setThreads(nextThreads);
    saveThreads(nextThreads);

    setInput('');
    setIsThinking(true);
    setIsListening(false);
    setIsVoiceProcessing(false);

    assistantReplyTimeoutRef.current = setTimeout(() => {
      const assistantMsg: Message = { id: 'a_' + Date.now(), role: 'assistant', content: 'No.', timestamp: Date.now(), type: 'text' };
      const finalThread: ChatThread = { ...updatedThread, updatedAt: Date.now(), messages: [...updatedThread.messages, assistantMsg] };
      const finalThreads = nextThreads.map((t) => (t.id === finalThread.id ? finalThread : t));
      setThreads(finalThreads);
      saveThreads(finalThreads);
      setIsThinking(false);
      assistantReplyTimeoutRef.current = null;
    }, 1000);
  };

  const handleToggleMic = () => {
    if (isListening) {
      handleStopListening();
    } else {
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (!isListening || isThinking || isVoiceProcessing) return;

    if (voiceProcessingTimeoutRef.current) clearTimeout(voiceProcessingTimeoutRef.current);

    setIsListening(false);
    setIsVoiceProcessing(true);

    voiceProcessingTimeoutRef.current = setTimeout(() => {
      setIsVoiceProcessing(false);
      voiceProcessingTimeoutRef.current = null;
      handleSendMessage('Voice message', {
        type: 'voice',
        meta: {
          durationLabel: '0:06',
          waveform: buildFakeWaveform(),
        },
      });
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#08090d] text-slate-100 font-sans">
      <QuietSidebar
        threads={mounted ? threads : []}
        activeThreadId={mounted ? activeThreadId : null}
        onSelectThread={(id) => { setActiveId(id); setActiveThreadId(id); }}
        onNewChat={handleNewChat}
        onDeleteThread={(id) => { const updated = deleteThread(id); setThreads(updated); if (activeThreadId === id && updated.length > 0) setActiveId(updated[0].id); }}
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col h-full min-w-0">
        <MinimalHeader
          selectedModelId={selectedModelId}
          onSelectModel={(id) => { setSelectedModelId(id); saveActiveModelId(id); }}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onNewChat={handleNewChat}
        />

        <main className="flex-1 min-h-0 relative flex flex-col">
          <PromptFirstChatView
            messages={mounted && activeThread ? activeThread.messages : []}
            isThinking={isThinking}
            activeModelName={activeModel.name}
            input={input}
            onChangeInput={setInput}
            onSubmit={(e) => { e.preventDefault(); if (input.trim()) handleSendMessage(input.trim()); }}
            isListening={isListening}
            isVoiceProcessing={isVoiceProcessing}
            onToggleMic={handleToggleMic}
            onStopListening={handleStopListening}
            onSelectPrompt={(text) => handleSendMessage(text)}
            showModelUpsell={Boolean(activeThread?.hasShownModelUpsell && !activeThread?.hasHandledModelUpsell)}
            onSelectUpsellModel={handleSelectUpsellModel}
            onDismissUpsell={handleDismissModelUpsell}
            selectedModelId={selectedModelId}
          />
        </main>
      </div>
    </div>
  );
}

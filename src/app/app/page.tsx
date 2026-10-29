'use client';

import { useState, useEffect } from 'react';
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
  clearAllThreads,
} from '@/lib/storage';

export default function AppPage() {
  const [mounted, setMounted] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>('noai-core');
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isFakeMicActive, setIsFakeMicActive] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;
  const activeModel = MODEL_VARIANTS.find((m) => m.id === selectedModelId) || MODEL_VARIANTS[0];

  const handleNewChat = () => {
    const fresh = createNewThread('New Chat', selectedModelId);
    setThreads(getStoredThreads());
    setActiveId(fresh.id);
    setInput('');
    setIsFakeMicActive(false);
  };

  const handleSendMessage = (userText: string) => {
    if (!userText.trim() || isThinking) return;

    let currentThread = activeThread;
    let currentThreads = [...threads];

    if (!currentThread) {
      currentThread = createNewThread(userText.slice(0, 24), selectedModelId);
      currentThreads = getStoredThreads();
      setActiveId(currentThread.id);
    }

    const userMsg: Message = { id: 'u_' + Date.now(), role: 'user', content: userText, timestamp: Date.now() };
    const updatedTitle = currentThread.messages.length === 0
      ? (userText.length > 24 ? userText.slice(0, 24) + '...' : userText)
      : currentThread.title;

    const updatedThread: ChatThread = {
      ...currentThread,
      title: updatedTitle,
      updatedAt: Date.now(),
      messages: [...currentThread.messages, userMsg],
    };

    const nextThreads = currentThreads.map((t) => (t.id === updatedThread.id ? updatedThread : t));
    setThreads(nextThreads);
    saveThreads(nextThreads);

    setInput('');
    setIsThinking(true);
    setIsFakeMicActive(false);

    // 1.0 second restrained delay
    setTimeout(() => {
      // CENTRAL RULE: Response content is ALWAYS exactly "No."
      const assistantMsg: Message = { id: 'a_' + Date.now(), role: 'assistant', content: 'No.', timestamp: Date.now() };
      const finalThread: ChatThread = { ...updatedThread, updatedAt: Date.now(), messages: [...updatedThread.messages, assistantMsg] };
      const finalThreads = nextThreads.map((t) => (t.id === finalThread.id ? finalThread : t));
      setThreads(finalThreads);
      saveThreads(finalThreads);
      setIsThinking(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input.trim());
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#08090d] text-slate-100 font-sans">
      {/* Slim Quiet Secondary Sidebar */}
      <QuietSidebar
        threads={mounted ? threads : []}
        activeThreadId={mounted ? activeThreadId : null}
        onSelectThread={(id) => { setActiveId(id); setActiveThreadId(id); }}
        onNewChat={handleNewChat}
        onDeleteThread={(id) => { const updated = deleteThread(id); setThreads(updated); if (activeThreadId === id && updated.length > 0) setActiveId(updated[0].id); }}
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
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
            onSubmit={handleSubmit}
            isFakeMicActive={isFakeMicActive}
            onToggleFakeMic={() => setIsFakeMicActive(!isFakeMicActive)}
            onSelectPrompt={(text) => handleSendMessage(text)}
          />
        </main>
      </div>
    </div>
  );
}







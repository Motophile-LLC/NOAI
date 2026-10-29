export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatThread {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  model: string;
  messages: Message[];
}

const THREADS_KEY = 'noai_chat_threads';
const ACTIVE_THREAD_KEY = 'noai_active_thread_id';
const ACTIVE_MODEL_KEY = 'noai_active_model_id';

export function getStoredThreads(): ChatThread[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(THREADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse chat threads', e);
    return [];
  }
}

export function saveThreads(threads: ChatThread[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  } catch (e) {
    console.error('Failed to save chat threads', e);
  }
}

export function getActiveThreadId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_THREAD_KEY);
}

export function setActiveThreadId(id: string | null): void {
  if (typeof window === 'undefined') return;
  if (id) {
    localStorage.setItem(ACTIVE_THREAD_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_THREAD_KEY);
  }
}

export function getStoredActiveModelId(): string {
  if (typeof window === 'undefined') return 'noai-core';
  return localStorage.getItem(ACTIVE_MODEL_KEY) || 'noai-core';
}

export function saveActiveModelId(modelId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_MODEL_KEY, modelId);
}

export function createNewThread(initialTitle: string = 'New Conversation', modelId: string = 'noai-core'): ChatThread {
  const now = Date.now();
  const newThread: ChatThread = {
    id: 'thread_' + now + '_' + Math.random().toString(36).substring(2, 7),
    title: initialTitle,
    createdAt: now,
    updatedAt: now,
    model: modelId,
    messages: [],
  };

  const existing = getStoredThreads();
  const updated = [newThread, ...existing];
  saveThreads(updated);
  setActiveThreadId(newThread.id);
  return newThread;
}

export function deleteThread(id: string): ChatThread[] {
  const existing = getStoredThreads();
  const updated = existing.filter((t) => t.id !== id);
  saveThreads(updated);

  if (getActiveThreadId() === id) {
    setActiveThreadId(updated.length > 0 ? updated[0].id : null);
  }
  return updated;
}

export function clearAllThreads(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(THREADS_KEY);
  localStorage.removeItem(ACTIVE_THREAD_KEY);
}


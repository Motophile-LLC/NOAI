'use client';

export default function GeminiGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Cool Cyan Glow */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-[120px] animate-pulse-glow" />
      
      {/* Top Right Deep Violet Glow */}
      <div className="absolute top-[5%] -right-[10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-gradient-to-bl from-purple-600/15 via-indigo-500/5 to-transparent rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Center Subtle Magenta Accent */}
      <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-gradient-to-tr from-pink-500/5 via-violet-600/5 to-transparent rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </div>
  );
}

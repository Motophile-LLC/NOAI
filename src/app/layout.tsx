import type { Metadata, Viewport } from 'next';
import './globals.css';
import GeminiGlow from '@/components/GeminiGlow';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export const viewport: Viewport = {
  themeColor: '#07080c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "No.AI — The World's Most Deterministic Intelligence Model",
  description: '100% Certainty. Zero Hallucination. Zero Compute Overhead. Always No.',
  keywords: ['AI', 'Deterministic AI', 'No.AI', 'Zero Hallucination', 'Inference', 'PWA'],
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'No.AI',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-slate-100 antialiased selection:bg-purple-500/30 selection:text-white">
        <ServiceWorkerRegister />
        <GeminiGlow />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}


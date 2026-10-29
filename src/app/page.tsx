import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeStats } from '@/components/home/HomeStats';
import { HomeShowcase } from '@/components/home/HomeShowcase';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { HomeTestimonials } from '@/components/home/HomeTestimonials';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-slate-100">
      <Navbar />
      <main className="flex-1">
        <HomeHero />
        <HomeStats />
        <HomeShowcase />
        <HomeFeatures />
        <HomeTestimonials />
      </main>
      <Footer />
    </div>
  );
}



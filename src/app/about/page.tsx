import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AboutMission } from '@/components/about/AboutMission';
import { AboutPrinciples } from '@/components/about/AboutPrinciples';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-slate-100">
      <Navbar />
      <main className="flex-1">
        <AboutMission />
        <AboutPrinciples />
      </main>
      <Footer />
    </div>
  );
}



import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PricingTiers } from '@/components/pricing/PricingTiers';
import { PricingComparison } from '@/components/pricing/PricingComparison';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-slate-100">
      <Navbar />
      <main className="flex-1">
        <PricingTiers />
        <PricingComparison />
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
}



import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { LogoMarquee } from "@/components/landing/LogoMarquee";
import { FitSection } from "@/components/landing/FitSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WorkSamplesSection } from "@/components/landing/WorkSamplesSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ApplicationForm } from "@/components/landing/ApplicationForm";
import { Footer } from "@/components/landing/Footer";
import { ApplicationPopup } from "@/components/landing/ApplicationPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <LogoMarquee />
        <FitSection />
        <ProblemSection />
        <ProcessSection />
        <PricingSection />
        <WorkSamplesSection />
        <TrustSection />
        <ApplicationForm />
      </main>
      <Footer />
      <ApplicationPopup />
    </div>
  );
};

export default Index;

import {
  ChatActionsShowcase,
  PricingSection,
  HeroSection,
  IntegrationsSection,
  KnowledgeCenterSection,
  ArchitectureSection,
  ModelsShowcase,
  Navbar,
  WhatIsLoopSection,
  PerformanceSection,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 space-y-24">
        <HeroSection />
        <ModelsShowcase />
        <WhatIsLoopSection />
        <ArchitectureSection />
        <PerformanceSection />
        <KnowledgeCenterSection />
        <ChatActionsShowcase />
        <IntegrationsSection />
        <PricingSection />
      </div>
    </div>
  );
}

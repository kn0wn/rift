"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ai/ui/button";
import { UpgradeModal } from "./UpgradeModal";
import { PricingContext, DEFAULT_PRICING_CONTEXT } from "@/lib/pricing-context";

export function UpgradeButton() {
  const [pricingContext, setPricingContext] = useState<PricingContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPricingContext() {
      try {
        const response = await fetch("/api/pricing-context", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load pricing context");
        }
        const data = (await response.json()) as PricingContext;
        if (!cancelled) {
          setPricingContext(data);
        }
      } catch {
        if (!cancelled) {
          setPricingContext(DEFAULT_PRICING_CONTEXT);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPricingContext();
    return () => {
      cancelled = true;
    };
  }, []);

  // Don't render if loading or user has active subscription
  if (isLoading || !pricingContext || pricingContext.hasActiveSubscription) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        variant="accent"
        onClick={() => setIsModalOpen(true)}
        className="text-xs px-4"
      >
        Actualizar a Plus
      </Button>
      <UpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

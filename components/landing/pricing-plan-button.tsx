'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ai/ui/button";
import type { LandingPlan } from "@/components/landing/data/pricing";
import {
  DEFAULT_PRICING_CONTEXT,
  PlanSlug,
  PricingContext,
  SubscriptionPlan,
} from "@/lib/pricing-context";

const CTA_BUTTON_CLASS =
  "hover:bg-white hover:text-[color(display-p3_0.1725490196_0.1764705882_0.1882352941/1)] hover:shadow-[rgba(0,0,0,0.1)_0px_0px_0px_1px] relative flex w-full cursor-pointer select-none items-center justify-center whitespace-nowrap bg-white text-sm leading-4 tracking-normal duration-[0.17s] text-[color(display-p3_0.1725490196_0.1764705882_0.1882352941/1)] dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px] rounded-[50px] h-10 border-none disabled:opacity-50 disabled:cursor-not-allowed";

type PlanButtonConfig = {
  label: string;
  href?: string;
  external?: boolean;
  disabled: boolean;
};

type PricingPlanButtonProps = {
  plan: LandingPlan;
  slug: PlanSlug;
};

export function PricingPlanButton({ plan, slug }: PricingPlanButtonProps) {
  const [context, setContext] = useState<PricingContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadContext() {
      try {
        const response = await fetch("/api/pricing-context", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load pricing context");
        }
        const data = (await response.json()) as PricingContext;
        if (!cancelled) {
          setContext(data);
        }
      } catch {
        if (!cancelled) {
          setContext(DEFAULT_PRICING_CONTEXT);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadContext();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <Button className={CTA_BUTTON_CLASS} disabled aria-busy="true" aria-live="polite">
        Suscribirse
      </Button>
    );
  }

  const resolvedContext = context ?? DEFAULT_PRICING_CONTEXT;
  const cta = buildPlanCta(slug, plan, resolvedContext);
  const linkHref = !cta.disabled && typeof cta.href === "string" ? cta.href : null;

  if (!linkHref) {
    return (
      <Button className={CTA_BUTTON_CLASS} disabled>
        {cta.label}
      </Button>
    );
  }

  return (
    <Button className={CTA_BUTTON_CLASS} asChild>
      {cta.external ? (
        <a href={linkHref}>{cta.label}</a>
      ) : (
        <Link href={linkHref}>{cta.label}</Link>
      )}
    </Button>
  );
}

function buildPlanCta(
  slug: PlanSlug,
  plan: LandingPlan,
  context: PricingContext,
): PlanButtonConfig {
  const defaultHref = getDefaultPlanHref(slug, context.isAuthenticated, plan);
  const isEnterprisePlan = slug === "enterprise";

  if (!context.hasActiveSubscription) {
    if (
      context.isAuthenticated &&
      context.currentPlan === "free" &&
      !context.canManageBilling
    ) {
      return {
        label: "Suscribirse",
        disabled: true,
      };
    }

    return {
      label: plan.buttonText,
      href: defaultHref,
      external: isEnterprisePlan,
      disabled: false,
    };
  }

  if (!context.activePlan) {
    return {
      label: "Suscripción activa",
      disabled: true,
    };
  }

  const isSamePlan = slug === context.activePlan;
  const userRank = getPlanRank(context.activePlan);
  const targetRank = getPlanRank(slug);

  if (isSamePlan) {
    if (context.canManageBilling) {
      return {
        label: "Administrar",
        href: "/settings/billing",
        external: false,
        disabled: false,
      };
    }

    return {
      label: "Activa",
      disabled: true,
    };
  }

  if (targetRank < userRank) {
    return {
      label: "Suscribirse",
      disabled: true,
    };
  }

  if (isEnterprisePlan) {
    return {
      label: plan.buttonText,
      href: defaultHref,
      external: true,
      disabled: false,
    };
  }

  const upgradeLabel =
    slug === "pro" && context.activePlan === "plus"
      ? "Cambiar a Pro"
      : `Cambiar a ${plan.name}`;

  if (!context.canManageBilling) {
    return {
      label: upgradeLabel,
      disabled: true,
    };
  }

  return {
    label: upgradeLabel,
    href: defaultHref,
    external: false,
    disabled: false,
  };
}

function getDefaultPlanHref(
  slug: PlanSlug,
  isAuthenticated: boolean,
  plan: LandingPlan,
): string {
  if (slug === "enterprise") {
    return plan.href;
  }

  const basePath = isAuthenticated ? "/subscribe" : "/sign-up";
  return `${basePath}?plan=${slug}`;
}

function getPlanRank(plan: SubscriptionPlan | null): number {
  if (!plan) return 0;
  const PLAN_ORDER: SubscriptionPlan[] = ["free", "plus", "pro", "enterprise"];
  const rank = PLAN_ORDER.indexOf(plan);
  return rank === -1 ? 0 : rank;
}


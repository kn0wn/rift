export type PlanSlug = "plus" | "pro" | "enterprise";
export type SubscriptionPlan = "free" | PlanSlug;

export type PricingContext = {
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  activePlan: PlanSlug | null;
  canManageBilling: boolean;
  currentPlan: SubscriptionPlan | null;
};

export const DEFAULT_PRICING_CONTEXT: PricingContext = {
  isAuthenticated: false,
  hasActiveSubscription: false,
  activePlan: null,
  canManageBilling: false,
  currentPlan: null,
};


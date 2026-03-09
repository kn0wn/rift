export type WorkspacePlanId = 'free' | 'plus' | 'pro'
export type PaidWorkspacePlanId = Exclude<WorkspacePlanId, 'free'>
export type WorkspaceFeatureId
  = 'byok'
    | 'providerPolicy'
    | 'compliancePolicy'
    | 'toolPolicy'

export type WorkspaceEffectiveFeatures = Record<WorkspaceFeatureId, boolean>

export type WorkspacePlan = {
  id: WorkspacePlanId
  name: string
  description: string
  monthlyPriceUsd: number
  includedSeats: number
  features: readonly string[]
  stripePriceEnvKey?: string
}

/**
 * The billing UI and Stripe configuration both resolve from this catalog so
 * plan copy, checkout payloads, and entitlement sync stay aligned.
 */
export const WORKSPACE_PLANS: readonly WorkspacePlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Core workspace access for one member.',
    monthlyPriceUsd: 0,
    includedSeats: 1,
    features: ['Core models', 'Single-member workspace'],
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Expanded model access and workspace controls.',
    monthlyPriceUsd: 8,
    includedSeats: 1,
    features: ['Expanded usage', 'BYOK', 'Workspace settings'],
    stripePriceEnvKey: 'STRIPE_PRICE_PLUS_MONTHLY',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Higher-capacity workspaces with advanced controls.',
    monthlyPriceUsd: 50,
    includedSeats: 1,
    features: ['Higher limits', 'Priority support', 'Advanced policies'],
    stripePriceEnvKey: 'STRIPE_PRICE_PRO_MONTHLY',
  },
] as const

export function getWorkspacePlan(planId: WorkspacePlanId): WorkspacePlan {
  const plan = WORKSPACE_PLANS.find((candidate) => candidate.id === planId)
  if (!plan) {
    throw new Error(`Unknown workspace plan: ${planId}`)
  }
  return plan
}

export function isPaidWorkspacePlan(
  plan: WorkspacePlan,
): plan is WorkspacePlan & { id: PaidWorkspacePlanId } {
  return plan.id !== 'free'
}

export function resolveStripePlanPriceId(planId: PaidWorkspacePlanId): string {
  const plan = getWorkspacePlan(planId)
  const envKey = plan.stripePriceEnvKey

  if (!envKey) {
    throw new Error(`Plan ${planId} is not backed by Stripe pricing`)
  }

  const value = process.env[envKey]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable ${envKey}`)
  }

  return value
}

/**
 * Server and client guards read a normalized boolean map so plan gating stays
 * stable even when UI copy changes independently of authorization behavior.
 */
export function getPlanEffectiveFeatures(
  planId: WorkspacePlanId,
): WorkspaceEffectiveFeatures {
  if (planId === 'pro') {
    return {
      byok: true,
      providerPolicy: true,
      compliancePolicy: true,
      toolPolicy: true,
    }
  }

  if (planId === 'plus') {
    return {
      byok: true,
      providerPolicy: false,
      compliancePolicy: false,
      toolPolicy: false,
    }
  }

  return {
    byok: false,
    providerPolicy: false,
    compliancePolicy: false,
    toolPolicy: false,
  }
}

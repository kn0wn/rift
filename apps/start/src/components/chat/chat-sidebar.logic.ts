export type ChatSidebarBottomPanelVisibilityInput = {
  loading: boolean
  user: unknown | null
  isAnonymous: boolean
  billingLoading: boolean
  planId: string | null | undefined
}

export type ChatSidebarBottomPanelVisibility = {
  shouldShowLoginButton: boolean
  shouldShowUpgradeCta: boolean
  shouldShowBottomPanel: boolean
}

/**
 * The sidebar bottom panel has two mutually exclusive states:
 * - anonymous or unresolved auth sessions should show the sign-in button
 * - signed-in, non-anonymous users on the free plan should show the upgrade CTA
 *
 * Centralizing the rule keeps the render path simple and prevents the upgrade
 * card from flashing during auth hydration or anonymous session bootstrap.
 */
export function resolveChatSidebarBottomPanelVisibility(
  input: ChatSidebarBottomPanelVisibilityInput,
): ChatSidebarBottomPanelVisibility {
  const hasResolvedUser = input.user != null
  const isFreePlan = input.planId === 'free'
  const shouldShowLoginButton =
    !input.loading && (!hasResolvedUser || input.isAnonymous)
  const shouldShowUpgradeCta =
    !input.loading
    && hasResolvedUser
    && !input.isAnonymous
    && !input.billingLoading
    && isFreePlan

  return {
    shouldShowLoginButton,
    shouldShowUpgradeCta,
    shouldShowBottomPanel: shouldShowLoginButton || shouldShowUpgradeCta,
  }
}

"use server";

import redirectToBillingPortal from "./redirectToBillingPortal";

/**
 * Billing Portal Actions
 *
 * Currently only redirectToSubscriptionUpdate is actively used for plan upgrades/downgrades.
 * Other functions are kept for future use cases.
 */

export async function redirectToSubscriptionUpdate(
  path: string = "plans",
  subscriptionId?: string,
) {
  return redirectToBillingPortal({
    path,
    flow: "subscription_update",
    subscriptionId,
  });
}

export async function redirectToGeneralBilling(path: string = "plans") {
  try {
    await redirectToBillingPortal(path);
  } catch (error) {
    console.error("Error redirecting to billing portal:", error);
    // In a server action, we can't use alert, so we'll throw a more user-friendly error
    if (error instanceof Error) {
      if (error.message.includes("organization")) {
        throw new Error(
          "Debes ser parte de una organización para acceder al portal de facturación.",
        );
      } else if (error.message.includes("Stripe customer")) {
        throw new Error(
          "Tu organización necesita tener configurado un cliente de Stripe.",
        );
      }
    }
    throw new Error(
      "Error al acceder al portal de facturación. Por favor, intenta de nuevo.",
    );
  }
}

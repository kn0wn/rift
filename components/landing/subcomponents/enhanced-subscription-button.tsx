"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirectToSubscriptionUpdate } from "@/actions/billingPortalActions";

interface EnhancedSubscriptionButtonProps {
  subscriptionLevel: string;
  userId: string;
  buttonText?: string;
}

export function EnhancedSubscriptionButton({
  subscriptionLevel,
  userId,
  buttonText = "Suscribir",
}: EnhancedSubscriptionButtonProps) {
  const currentOrgPlan = useQuery(api.organizations.getCurrentOrganizationPlan);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // If still loading the organization data, show loading state
  if (currentOrgPlan === undefined) {
    return (
      <button
        disabled
        className="w-full mt-6 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed transition-colors duration-200"
      >
        Cargando...
      </button>
    );
  }

  const handleSubscriptionAction = async () => {
    setLoading(true);

    try {
      // Check if user has an active subscription and wants to change plans
      const hasActiveSubscription =
        currentOrgPlan?.subscriptionStatus === "active" &&
        (buttonText === "Mejorar" || buttonText === "Degradar");

      if (hasActiveSubscription) {
        // Use billing portal for plan changes
        await redirectToSubscriptionUpdate("plans");
      } else {
        // Use checkout flow for new subscriptions
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            subscriptionLevel: subscriptionLevel.toLowerCase(),
          }),
        });

        const { error, url } = await res.json();

        if (!error) {
          return router.push(url);
        } else {
          console.error(`Error al suscribirse al plan: ${error}`);
          alert(`Error al procesar la suscripción: ${error}`);
        }
      }
    } catch (error) {
      console.error("Error handling subscription action:", error);

      // Handle specific billing portal errors
      if (error instanceof Error) {
        if (error.message.includes("organization")) {
          alert(
            "Error: Debes ser parte de una organización para acceder al portal de facturación.",
          );
        } else if (error.message.includes("Stripe customer")) {
          alert(
            "Error: Tu organización necesita tener configurado un cliente de Stripe.",
          );
        } else {
          alert(`Error al procesar la solicitud: ${error.message}`);
        }
      } else {
        alert(
          "Error inesperado al procesar la solicitud. Por favor, intenta de nuevo.",
        );
      }
    }

    setLoading(false);
  };

  // Disable button if it's the current plan
  const isCurrentPlan = buttonText === "Plan Actual";

  return (
    <button
      onClick={handleSubscriptionAction}
      disabled={loading || isCurrentPlan}
      className={`w-full mt-6 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isCurrentPlan
          ? "bg-accent text-white cursor-not-allowed opacity-75"
          : "bg-accent text-white hover:bg-accent/90 disabled:opacity-50"
      }`}
    >
      {loading ? "Procesando..." : buttonText}
    </button>
  );
}

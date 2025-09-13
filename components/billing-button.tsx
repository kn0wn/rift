"use client";

import { useState, useTransition } from "react";
import { redirectToGeneralBilling } from "@/actions/billingPortalActions";

interface BillingButtonProps {
  path?: string;
  className?: string;
  children: React.ReactNode;
}

export function BillingButton({
  path = "plans",
  className = "px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent-strong transition-colors",
  children,
}: BillingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      try {
        await redirectToGeneralBilling(path);
      } catch (error) {
        console.error("Error redirecting to billing portal:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "Error al acceder al portal de facturación. Por favor, intenta de nuevo."
          );
        }
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`${className} ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isPending ? "Procesando..." : children}
      </button>
      {error && (
        <div className="mt-2 p-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

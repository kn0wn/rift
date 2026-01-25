"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertTriangle } from "lucide-react";
import { QuotaCard } from "./QuotaCard";

// Hoist static error JSX (Vercel best practice: rendering-hoist-jsx)
const authError = (
  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50 flex items-start space-x-3">
    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
    <div>
      <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error de autenticación</h3>
      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
        No se pudo autenticar la sesión. Por favor intenta más tarde.
      </p>
    </div>
  </div>
);

const dataError = (
  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50">
    <p className="text-sm text-red-700 dark:text-red-400">
      No se pudo cargar la información de cuotas. Por favor intenta más tarde.
    </p>
  </div>
);

export function UsageDataClient({
  preloadedQuotaInfo,
}: {
  preloadedQuotaInfo: Preloaded<typeof api.users.getUserFullQuotaInfo> | null;
}) {
  if (!preloadedQuotaInfo) {
    return authError;
  }

  const quotaInfo = usePreloadedQuery(preloadedQuotaInfo);

  if (!quotaInfo) {
    return dataError;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <QuotaCard type="standard" data={quotaInfo.standard} />
        <QuotaCard type="premium" data={quotaInfo.premium} />
      </div>
      <QuotaCard type="reset" nextResetDate={quotaInfo.nextResetDate} />
    </>
  );
}

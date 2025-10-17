import React, { useEffect, useRef } from "react";

// Legacy local UI state removed; global UI store is used instead.

export function useModelChangeEffect(
  selectedModel: string,
  setChatKey: React.Dispatch<React.SetStateAction<number>>,
  setQuotaError: (error: any) => void,
  setShowNoSubscriptionDialog: (show: boolean) => void,
  setIsSearchEnabled: (enabled: boolean) => void
) {
  const prevModelRef = useRef(selectedModel);

  useEffect(() => {
    if (prevModelRef.current !== selectedModel) {
      prevModelRef.current = selectedModel;
      setChatKey((prev: number) => prev + 1);
      // Clear quota error and dialog when switching models
      setQuotaError(null);
      setShowNoSubscriptionDialog(false);
    }
  }, [selectedModel, setChatKey, setQuotaError, setShowNoSubscriptionDialog]);

  // Initialize search state from localStorage when model changes
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      const savedSearchState = localStorage.getItem("webSearchEnabled");
      const searchEnabled = savedSearchState === "true";
      setIsSearchEnabled(searchEnabled);
    }
  }, [selectedModel, setIsSearchEnabled]);
}

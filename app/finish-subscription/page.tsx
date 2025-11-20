"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCustomer } from "autumn-js/react";
import CheckoutDialog from "@/components/autumn/checkout-dialog";
import { Loader2 } from "lucide-react";

export default function FinishSubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");
  const { customer, checkout, isLoading } = useCustomer({ errorOnNotFound: false });
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (!productId) {
      router.push("/");
      return;
    }

    if (!isLoading && customer) {
      const initiateCheckout = async () => {
        await checkout({
          productId: productId,
          dialog: CheckoutDialog,
          successUrl: window.location.origin,
        });
        // After checkout dialog is closed or finished, we might want to redirect or show something
        // For now, we can just let the dialog handle the success state or redirect
        // If the dialog is closed without success, the user stays here. 
        // Ideally, we should probably redirect to a dashboard if they close it?
        // Let's assume checkout handles its own flow.
      };
      
      initiateCheckout();
    }
  }, [productId, isLoading, customer, checkout, router]);

  if (!productId) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <h1 className="text-xl font-semibold">Finalizando tu suscripción...</h1>
        <p className="text-muted-foreground">Por favor espera un momento.</p>
      </div>
    </div>
  );
}

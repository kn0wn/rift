"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ai/ui/dialog";
import { Button } from "@/components/ai/ui/button";

interface NoSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orgName?: string | null;
}

export function NoSubscriptionDialog({
  isOpen,
  onClose,
  orgName,
}: NoSubscriptionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mr-3 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold leading-6">
                Suscripción Requerida
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm leading-5 mt-1">
                Tu organización necesita una suscripción activa para continuar usando Rift
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <a href="mailto:planes@rift.mx" className="flex items-center">
              Contáctanos
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

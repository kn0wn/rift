"use client";

import { useConvexAuth } from "convex/react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useEffect, useState } from "react";
import { Button } from "@/components/ai/ui/button";
import { Users, LogOut, Mail } from "lucide-react";
import authkitSignOut from "@/actions/signout";

export function NoOrgModal() {
  const { isAuthenticated } = useConvexAuth();
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated || !auth.user) {
    return null;
  }

  // Check if user has an organization
  const hasOrganization = auth.organizationId;

  if (hasOrganization) {
    return null;
  }

  const userName = auth.user.firstName || auth.user.email?.split("@")[0] || "";

  const handleLogout = async () => {
    try {
      await authkitSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-2xl bg-popover-main border border-border/50 shadow-2xl overflow-hidden">
        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-popover-text">
            ¡Hola, {userName}!
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Parece que no tienes una organización asociada a tu cuenta.
            </p>
          </div>

          {/* Access Instructions Card */}
          <div className="rounded-xl bg-popover-secondary/30 border border-border/40 p-5 space-y-4">
            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <div>
                <p className="text-popover-text font-medium mb-2 flex items-center gap-2">
                  Verifica que hayas iniciado sesión
                </p>
                <p>
                  Asegúrate de estar usando el correo de tu organización <span className="text-blue-400">{auth.user.email}</span>
                </p>
              </div>

              <div className="border-t border-border/20 pt-4">
                <p className="text-popover-text font-medium mb-2">Si acabas de aceptar la invitación</p>
                <p>
                  Prueba cerrar sesión y volver a iniciar sesión si acabas de aceptar la invitación de tu organización.
                </p>
              </div>

              <div className="border-t border-border/20 pt-4">
                <p className="text-popover-text font-medium mb-2">¿No tienes acceso aún?</p>
                <p>
                  Contacta a tu administrador para que te envíe una invitación a <span className="text-blue-400">{auth.user.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <p className="text-xs text-muted-foreground">
            <span className="text-popover-text font-medium">¿Necesitas soporte?</span> Contáctanos en{" "}
            <a href="mailto:support@rift.com" className="text-blue-400 hover:underline">
              support@rift.com
            </a>
          </p>

          {/* Sign out button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full rounded-lg h-11 font-medium text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/50 hover:bg-destructive/5"
            size="lg"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Flex } from "@radix-ui/themes";
import { WorkOsWidgets, UserSessions, UserSecurity } from "@workos-inc/widgets";

interface SecurityWidgetProps {
  authTokenPromise: Promise<string | null>;
  userId: string;
}

export function SecurityWidget({ authTokenPromise, userId }: SecurityWidgetProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authTokenPromise.then((token) => {
      setAuthToken(token);
      setLoading(false);
    });
  }, [authTokenPromise]);

  if (loading || !authToken) {
    return null; // Show nothing while loading or if no token
  }

  return (
    <WorkOsWidgets
      theme={{
        appearance: "inherit",
        accentColor: "blue",
        radius: "large",
        fontFamily: "Inter",
        panelBackground: "translucent",
      }}
    >
      <Flex direction="column" gap="6" width="100%">
        <UserSecurity authToken={authToken} />
        <div className="flex flex-col">
          <div className="flex flex-col mb-5">
            <div className="flex items-center">
              <p className="font-semibold text-base leading-6">
                Sesiones Activas
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-5 mt-1">
              Gestiona tus preferencias de seguridad y configuración
              de autenticación.
            </p>
          </div>

          <UserSessions
            authToken={authToken}
            currentSessionId={userId}
          />
        </div>
      </Flex>
    </WorkOsWidgets>
  );
}

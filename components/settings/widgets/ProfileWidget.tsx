'use client';

import { useEffect, useState } from 'react';
import { WorkOsWidgets, UserProfile } from "@workos-inc/widgets";

interface ProfileWidgetProps {
  authTokenPromise: Promise<string | null>;
}

export function ProfileWidget({ authTokenPromise }: ProfileWidgetProps) {
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
      <UserProfile authToken={authToken} />
    </WorkOsWidgets>
  );
}

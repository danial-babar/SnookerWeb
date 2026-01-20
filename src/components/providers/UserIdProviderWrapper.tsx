"use client";

import { UserIdProvider } from "@/contexts/UserIdContext";
import { Suspense } from "react";

export function UserIdProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserIdProvider>{children}</UserIdProvider>
    </Suspense>
  );
}


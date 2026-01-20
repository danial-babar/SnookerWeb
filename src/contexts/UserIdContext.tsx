"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface UserIdContextType {
  userId: string | null;
  isLoading: boolean;
}

const UserIdContext = createContext<UserIdContextType>({
  userId: null,
  isLoading: true,
});

// Client component wrapper that uses useSearchParams
function UserIdProviderClient({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    // First, check localStorage for existing userId
    const storedUserId = localStorage.getItem("hashedUserId");
    
    // Then check URL for userId
    const idFromUrl = searchParams?.get("id");
    
    let finalUserId: string | null = null;

    if (idFromUrl) {
      // URL has userId - use it and update localStorage
      finalUserId = idFromUrl;
      localStorage.setItem("hashedUserId", idFromUrl);
      setUserId(finalUserId);
      setHasInitialized(true);
    } else if (storedUserId) {
      // No userId in URL but exists in localStorage - use stored value
      finalUserId = storedUserId;
      setUserId(finalUserId);
      
      // Append userId to URL if not already present (only on initial load)
      if (!hasInitialized && pathname) {
        const currentPath = pathname;
        const basePath = currentPath.startsWith('/team_dashboard') ? '/team_dashboard' : '';
        const newPath = `${currentPath}?id=${storedUserId}`;
        // Use replace to avoid adding to history stack
        window.history.replaceState({}, '', newPath);
        setHasInitialized(true);
      }
    } else {
      // No userId anywhere - set to null
      setUserId(null);
      setHasInitialized(true);
    }
    
    setIsLoading(false);
  }, [searchParams, pathname, hasInitialized]);

  return (
    <UserIdContext.Provider value={{ userId, isLoading }}>
      {children}
    </UserIdContext.Provider>
  );
}

// Server-safe provider wrapper
export function UserIdProvider({ children }: { children: ReactNode }) {
  return <UserIdProviderClient>{children}</UserIdProviderClient>;
}

export function useUserId() {
  const context = useContext(UserIdContext);
  if (context === undefined) {
    throw new Error("useUserId must be used within a UserIdProvider");
  }
  return context;
}


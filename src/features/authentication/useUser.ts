import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/ApiAuth";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";
import type { Session } from "@supabase/supabase-js";

export function useUser() {

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Listen for auth state changes to know when session is loaded
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        setIsSessionLoading(false);
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 1,
  });

  return {
    user,
    isPending: isPending || isSessionLoading,
    isAuthenticated: !!user && !error && session,
    error,
  };
}

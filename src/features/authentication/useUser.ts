import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/ApiAuth";

export function useUser() {
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    user,
    isPending,
    isAuthenticated: !!user,
    error,
  };
}

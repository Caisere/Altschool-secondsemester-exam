import { getUserStickyWalls } from "@/services/data-service";
import { useQuery } from "@tanstack/react-query";


export function useCurrentUserStickyWall() {
    const { data: stickyWalls, isPending, error} = useQuery({
        queryKey: ["user-stickywall"],
        queryFn: getUserStickyWalls,
        // retry: 1,
        // staleTime: 1000 * 60 * 5, // 5 minutes
        // gcTime: 1000 * 60 * 10, // 10 minutes
    });
    return {
        stickyWalls,
        isPending,
        error,
    };
}
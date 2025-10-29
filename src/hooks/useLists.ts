import { getUserLists } from "@/services/data-service";
import { useQuery } from "@tanstack/react-query";

export function useLists() {
    const {data: lists, error, isPending} = useQuery({
        queryKey: ['lists'],
        queryFn: getUserLists,
        staleTime: 0,
        refetchOnWindowFocus: true
    })

    return {lists, error, isPending}
}
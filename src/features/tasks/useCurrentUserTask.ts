import {getUpcomingTasksByCurrentUser, getUserTasks, getUserTodayTasks} from "@/services/data-service";
import { useQuery } from "@tanstack/react-query";


export function useCurrentUserTask() {
  const { data: tasks, isPending, error,} = useQuery({
    queryKey: ["user-task"],
    queryFn: getUserTodayTasks,
    // retry: 1,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    tasks,
    isPending,
    error,
  };
}

export function useUpcomingTaskByCurrentUser () {
    const { data: upcomingTasks, isPending, error,} = useQuery({
        queryKey: ["user-upcomingTask"],
        queryFn: getUpcomingTasksByCurrentUser,
        // retry: 1,
        // staleTime: 1000 * 60 * 5, // 5 minutes
        // gcTime: 1000 * 60 * 10, // 10 minutes
    });

    return {
    upcomingTasks,
    isPending,
    error,
    };
}

export function useUserTasks () {
    const { data: tasks, isPending, error,} = useQuery({
        queryKey: ["user-total-tasks"],
        queryFn: getUserTasks
        // retry: 1,
        // staleTime: 1000 * 60 * 5, // 5 minutes
        // gcTime: 1000 * 60 * 10, // 10 minutes
    });

    return {
        tasks,
        isPending,
        error,
    };
}


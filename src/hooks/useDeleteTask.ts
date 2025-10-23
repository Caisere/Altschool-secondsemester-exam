import { deleteTask as deleteTaskApi } from "@/services/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteTask() {

    const queryClient = useQueryClient()

    const {mutate: deleteTask, isPending: isDeleting, error} = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => {
            toast.success('Booking successfully delete')
            queryClient.invalidateQueries({
                queryKey: ['user-task']
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return {deleteTask, isDeleting, error}
}
import { createStickNoteForCurrentUser, createTaskForCurrentUser } from "@/services/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";



export function useCreateTask () {
    const queryClient = useQueryClient()

    const {mutate: createTask, isPending:isCreatingTask, error} = useMutation({
        mutationFn: createTaskForCurrentUser,
        onSuccess: () => {
            toast.success('Task Successfully Created')
            queryClient.invalidateQueries({
                queryKey: ['user-task']
            })
            queryClient.invalidateQueries({
                queryKey: ['lists']
            })
        },
        onError: (error) => {
            console.error('Create task error:', error)
            toast.error('Error while creating task. Please, try again later!')
        }
    })

    return {
        isCreatingTask, createTask, error
    }
}

export function useStickyNote () {
    const queryClient = useQueryClient()

    const {mutate: createStickyNote, isPending: isCreatingStickyNote, error} = useMutation({
        mutationFn: createStickNoteForCurrentUser,
        onSuccess: () => {
            toast.success('Sticky-Note Successfully Created')
            queryClient.invalidateQueries({
                queryKey: ['user-stickywall']
            })
        },
        onError: (error) => {
            console.error('Create StickyNote error:', error)
            toast.error('Error while creating Sticky-Note. Please, try again later!')
        }
    })

    return {
        createStickyNote, isCreatingStickyNote, error
    }
}
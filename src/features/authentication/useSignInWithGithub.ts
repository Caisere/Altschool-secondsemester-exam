import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithGithub as signInWithGithubApi } from "../../services/ApiAuth";
import toast from "react-hot-toast";

export function useSignInWithGithub() {
    const queryClient = useQueryClient()

    const {mutate: signInWithGithub} = useMutation({
        mutationFn: signInWithGithubApi,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success('Redirecting to Github...')
            // navigate('/dashboard')
        },
        onError: () => {
            toast.error('Unable to Sign In with Github')
        }
    })

    return {signInWithGithub}
}
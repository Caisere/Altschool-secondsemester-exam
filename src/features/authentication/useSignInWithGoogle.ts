import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithGoogle as signInWithGoogleApi } from "../../services/ApiAuth";
import toast from "react-hot-toast";

export function useSignInWithGoogle() {
    const queryClient = useQueryClient()

    const {mutate: signInWithGoogle} = useMutation({
        mutationFn: signInWithGoogleApi,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            toast.success('Redirecting to Google...')
            // navigate('/dashboard')
        },
        onError: () => {
            toast.error('Unable to Sign In with Google')
        }
    })

    return {signInWithGoogle}
}
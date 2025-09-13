import { useMutation } from "@tanstack/react-query";
import { signup, type SignUpProps } from "../../services/ApiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUp() {

    const navigate = useNavigate()

    const {mutate: signUp, isPending: isSigningUp} = useMutation({
        mutationFn: ({fullName, email, password}: SignUpProps) => signup({fullName, email, password}),
        onSuccess: () => {
            toast.success('Account Successful Created')
            navigate('/signin')
        },
        onError: () => {
            toast.error('User cannot be created at the moment. Try again later!')
        }
    })

    return {signUp, isSigningUp}
}
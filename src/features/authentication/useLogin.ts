import { useMutation } from "@tanstack/react-query";
import { signin, type SignInProps } from "../../services/ApiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {

    const navigate = useNavigate()

    const {mutate: login, isPending: isSigningIn} = useMutation({
        mutationFn: ({email, password}:SignInProps) => signin({email, password}),
        onSuccess: (user) => {
            console.log(user)
            toast.success(`Welcome ${user.user.user_metadata.fullName}`)
            navigate('/dashboard')
        },
        onError: () => {
            toast.error('Provided email or password are incorrect')
        }
    })

    return{login, isSigningIn}
}
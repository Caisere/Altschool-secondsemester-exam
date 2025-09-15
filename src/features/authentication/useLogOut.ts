import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/ApiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const {mutate: logout, isPending: isLoggingOut} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            toast.success('Signed-Out')
            navigate('/signin')
        }
    })

    return {logout, isLoggingOut}
}
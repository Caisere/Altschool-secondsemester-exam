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
            // Clear queries on logout
            queryClient.removeQueries();
            
            // toast signout message
            toast.success('Signed-Out');
            
            // small delay in the page routing to ensure cleanup completes
            setTimeout(() => {
                navigate('/signin');
            }, 100);
        },
        onError: (error) => {
            console.error('Logout error:', error);
            toast.error('Failed to sign out. Please try again.');
        }
    })

    return {logout, isLoggingOut}
}
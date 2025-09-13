import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { PageLoader } from "./loadingskeleton";


function ProtectedRoute({children}:{children: React.ReactNode}) {

    const {isPending, isAuthenticated} = useUser()

    const navigate = useNavigate()


    useEffect(() => {
        if(!isAuthenticated && !isPending) {
            navigate('/')
        }
    }, [isAuthenticated, isPending, navigate])

    if (isPending) return <PageLoader />

    if (isAuthenticated) return children

    return null
}

export default ProtectedRoute;

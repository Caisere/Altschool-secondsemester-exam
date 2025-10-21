import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect, useState } from "react";
import { PageLoader } from "./loadingskeleton";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isPending, isAuthenticated } = useUser();
//   const navigate = useNavigate();
//   const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

//   useEffect(() => {
//     // Add a small delay to prevent flash of loading screen
//     const timer = setTimeout(() => {
//       setHasCheckedAuth(true);
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (hasCheckedAuth && !isAuthenticated && !isPending) {
//       console.log("Redirecting to home - not authenticated");
//       navigate("/");
//     }
//   }, [isAuthenticated, isPending, navigate, hasCheckedAuth]);

  // Show loading while checking auth or if still pending
  if (isPending) {
    return <PageLoader />;
  }

  // If authenticated, show children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and checked, return null (will redirect)
  return null;
}

export default ProtectedRoute;

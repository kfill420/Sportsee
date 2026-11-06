import { Navigate, Outlet } from "react-router";
import { useUser } from "~/context/UserContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

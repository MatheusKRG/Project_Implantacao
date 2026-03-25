import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="app-shell">Carregando sessao...</div>;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
}

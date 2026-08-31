import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";


export default function useAuthorize() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoading } = useUser();

  const isAuthenticated = Boolean(user);

  const isPanelRoute = location.pathname.includes("/panel");

  const isProfileCompleted =
    Boolean(user?.first_name) &&
    Boolean(user?.last_name) &&
    Boolean(user?.email);

  const role = user?.role ?? null;

  useEffect(() => {
    if (isLoading) return;

    if (isPanelRoute && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
    
  }, [isLoading, isPanelRoute, isAuthenticated, navigate]);

  return {
    user,
    role,
    isLoading,
    isAuthenticated,
    isPanelRoute,
    isProfileCompleted,
  };
  
}

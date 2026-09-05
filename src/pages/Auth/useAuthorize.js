import { useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function useAuthorize() {
  const location = useLocation();

  const { user, isLoading } = useUser();

  console.log("AUTH DEBUG:", {
    user,
    isLoading,
  });

  const isAuthenticated = Boolean(user);

  const isPanelRoute = location.pathname.includes("/panel");

  const isProfileCompleted =
    Boolean(user?.user_name) &&
    Boolean(user?.email);

  const role = user?.role_id ?? null;

  return {
    user,
    role,
    isLoading,
    isAuthenticated,
    isPanelRoute,
    isProfileCompleted,
  };
}
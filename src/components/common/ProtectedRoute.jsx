import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../UI/Loading";
import useAuthorize from "../../pages/Auth/useAuthorize";


function ProtectedRoute({ children, allowedRoles = [] }) {
  const navigate = useNavigate();

  const {
    role,
    isLoading,
    isAuthenticated,
    isProfileCompleted,
  } = useAuthorize();

  const isAuthorized = allowedRoles.includes(role);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (!isProfileCompleted) {
      navigate("/panel/profile", { replace: true });
      return;
    }

    if (!isAuthorized) {
      navigate("/not-access", { replace: true });
    }
  }, [
    isLoading,
    isAuthenticated,
    isProfileCompleted,
    isAuthorized,
    navigate,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-100">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!isProfileCompleted) return null;

  if (!isAuthorized) return null;

  return children;
}

export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import Loading from "../UI/Loading";
import useAuthorize from "../../pages/Auth/useAuthorize";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const {
    role,
    isLoading,
    isAuthenticated,
    isProfileCompleted,
  } = useAuthorize();

  // هنوز اطلاعات کاربر مشخص نشده
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-100">
        <Loading />
      </div>
    );
  }

  // کاربر لاگین نیست
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // پروفایل کامل نشده
  if (!isProfileCompleted) {
    return <Navigate to="/panel/profile" replace />;
  }

  // تبدیل role به number برای جلوگیری از مشکل "2" و 2
  const userRole = Number(role);

  // بررسی دسترسی
  const isAuthorized =
    allowedRoles.length === 0 ||
    allowedRoles.map(Number).includes(userRole);

  // دسترسی ندارد
  if (!isAuthorized) {
    return <Navigate to="/not-access" replace />;
  }

  // همه چیز درست است
  return children;
}

export default ProtectedRoute;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: string | string[];
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  allowedRoles,
}) => {
  const { role, token, dinasName } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // console.log("ProtectedRoute Debug:", {
  //   token,
  //   role,
  //   dinasName,
  //   requiredRole,
  //   allowedRoles,
  //   path: location.pathname
  // });

  // Jika tidak terautentikasi, redirect ke login
  if (!token) {
    console.log("No token, redirecting to login");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Jika ada allowedRoles, cek apakah role user termasuk di dalamnya
  if (allowedRoles && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      console.log("Role not allowed, redirecting to home");
      return <Navigate to="/admin" replace />;
    }
  }

  // Jika ada requiredRole (untuk dinas specific)
  if (requiredRole && role === "DINAS") {
    if (Array.isArray(requiredRole)) {
      if (!dinasName || !requiredRole.includes(dinasName)) {
        console.log("Dinas not allowed, redirecting to home");
        return <Navigate to="/dinas" replace />;
      }
    } else {
      if (dinasName !== requiredRole) {
        console.log("Dinas not allowed, redirecting to home");
        return <Navigate to="/dinas" replace />;
      }
    }
  }

  console.log("Access granted");
  return children;
};

export default ProtectedRoute;
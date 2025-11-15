import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { role, token, dinasName } = useSelector((state: RootState) => state.auth);

  // Jika tidak terautentikasi, redirect ke login
  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  // Jika ada requiredRole tapi user role tidak sesuai
  if (requiredRole && dinasName !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;

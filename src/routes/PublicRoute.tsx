import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // console.log("PublicRoute Debug:", { token, path: location.pathname });

  // Jika sudah login, redirect ke home
  if (token) {
    const from = location.state?.from?.pathname || "/dinas/laporan";
    console.log("Already authenticated, redirecting to:", from);
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
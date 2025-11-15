// components/common/PublicRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router';
import { RootState } from '../redux/store';

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const {token} = useSelector((state: RootState) => state.auth);

  console.log(token)
  // Jika sudah login, redirect ke home
  if (token) {
    return <Navigate to="/home" replace={true}/>;
  }

  return children;
};

export default PublicRoute;
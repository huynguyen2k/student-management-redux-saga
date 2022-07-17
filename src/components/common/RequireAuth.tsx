import { useAppSelector } from 'app/hooks';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface RequireAuthProps {
  children?: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
}

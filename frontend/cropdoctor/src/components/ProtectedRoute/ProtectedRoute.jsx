import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  // If the user is logged in, show the child route (Outlet).
  // Otherwise, redirect them to the login page.
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
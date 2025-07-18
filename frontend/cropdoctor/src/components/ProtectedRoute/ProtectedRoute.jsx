import React , {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);

  // If the user is logged in, show the child route (Outlet).
  // Otherwise, redirect them to the login page.
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
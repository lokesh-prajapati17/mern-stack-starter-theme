import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "../../store/slices/authSlice";
import Loader from "../common/Loader";

/**
 * AuthGuard Component
 * Protects private routes. If user is unauthenticated, redirects to /login.
 */
export const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();

  if (loading) {
    return <Loader fullPage message="Authenticating session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;

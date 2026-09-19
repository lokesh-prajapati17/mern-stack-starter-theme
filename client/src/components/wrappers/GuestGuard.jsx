import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

/**
 * GuestGuard Component
 * Protects public-only routes (e.g. login, register).
 * If user is already authenticated, redirects to dashboard.
 */
export const GuestGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;

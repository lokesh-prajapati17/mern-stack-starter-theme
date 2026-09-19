import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { hasPermission } from "../../constants/RbacConstants";

/**
 * RoleGuard Component (Arrow function)
 * Supports both Route Guard and Inline UI element gatekeeping.
 */
export const RoleGuard = ({
  allowedRoles = [],
  requiredPermissions = [],
  fallback = null,
  isRoute = false,
  children,
}) => {
  const user = useSelector(selectCurrentUser);
  const userRole = user?.role;

  // Check role match
  const hasRoleMatch =
    allowedRoles.length === 0 || (userRole && allowedRoles.includes(userRole));

  // Check permission match
  const hasPermissionsMatch =
    requiredPermissions.length === 0 ||
    (userRole &&
      requiredPermissions.every((perm) => hasPermission(userRole, perm)));

  const isAuthorized = hasRoleMatch && hasPermissionsMatch;

  if (!isAuthorized) {
    if (isRoute) {
      return fallback || <Navigate to="/unauthorized" replace />;
    }
    return fallback;
  }

  return children ? children : <Outlet />;
};

RoleGuard.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  requiredPermissions: PropTypes.arrayOf(PropTypes.string),
  fallback: PropTypes.node,
  isRoute: PropTypes.bool,
  children: PropTypes.node,
};

export default RoleGuard;

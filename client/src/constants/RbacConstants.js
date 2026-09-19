/**
 * Role-Based Access Control (RBAC) Constants
 */
export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  USER: "User",
};

export const USER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
};

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.MANAGER]: 2,
  [ROLES.USER]: 1,
};

export const PERMISSIONS = {
  MANAGE_USERS: "manage:users",
  VIEW_USERS: "view:users",
  MANAGE_SETTINGS: "manage:settings",
  VIEW_ANALYTICS: "view:analytics",
  CREATE_RESOURCE: "create:resource",
  EDIT_RESOURCE: "edit:resource",
  DELETE_RESOURCE: "delete:resource",
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.CREATE_RESOURCE,
    PERMISSIONS.EDIT_RESOURCE,
  ],
  [ROLES.USER]: [PERMISSIONS.VIEW_ANALYTICS],
};

/**
 * Check if a role possesses a target permission
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

/**
 * Check if current role level is greater than or equal to minimum required role
 * @param {string} currentRole
 * @param {string} minRequiredRole
 * @returns {boolean}
 */
export const hasRoleLevel = (currentRole, minRequiredRole) => {
  const currentLevel = ROLE_HIERARCHY[currentRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[minRequiredRole] || 0;
  return currentLevel >= requiredLevel;
};

/**
 * Application Roles and Permissions Constants
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

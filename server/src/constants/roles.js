const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  USER: "User",
};

const USER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
};

const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.MANAGER]: 2,
  [ROLES.USER]: 1,
};

module.exports = {
  ROLES,
  USER_STATUS,
  ROLE_HIERARCHY,
};

import { ROLES, USER_STATUS } from "../../../constants/RbacConstants";

export const USER_ROLE_OPTIONS = [
  { value: ROLES.ADMIN, label: "Admin (Full Access)" },
  { value: ROLES.MANAGER, label: "Manager" },
  { value: ROLES.USER, label: "User" },
];

export const USER_STATUS_OPTIONS = [
  { value: USER_STATUS.ACTIVE, label: "Active" },
  { value: USER_STATUS.INACTIVE, label: "Inactive" },
  { value: USER_STATUS.SUSPENDED, label: "Suspended" },
];

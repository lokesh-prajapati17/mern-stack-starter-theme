import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Palette,
  Settings,
} from "lucide-react";
import { ROLES } from "../../constants/RbacConstants";

/**
 * Main application navigation items schema
 */
export const navigationItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },
  {
    id: "users",
    title: "User Directory",
    url: "/users",
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    id: "theme-showcase",
    title: "Theme & UI Atoms",
    url: "/dashboard/showcase",
    icon: Palette,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },
  {
    id: "rbac-demo",
    title: "RBAC Access Demo",
    url: "/dashboard/rbac",
    icon: ShieldCheck,
    roles: [ROLES.ADMIN],
  },
  {
    id: "settings",
    title: "Settings",
    url: "/settings",
    icon: Settings,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
  },
];

/**
 * Filter navigation items by current user role (Arrow function)
 * @param {string} userRole
 * @returns {Array}
 */
export const getAuthorizedNavItems = (userRole) => {
  if (!userRole) return [];
  return navigationItems.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );
};

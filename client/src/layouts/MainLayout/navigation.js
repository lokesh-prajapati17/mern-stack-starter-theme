import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Palette,
  Settings,
} from "lucide-react";
import { ROLES } from "../../constants/RbacConstants";

/**
 * Main application navigation groups with section titles
 */
export const navigationGroups = [
  {
    id: "main",
    header: null,
    items: [
      {
        id: "dashboard",
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      },
    ],
  },
  {
    id: "management",
    header: "MANAGEMENT",
    items: [
      {
        id: "users",
        title: "Users",
        url: "/users",
        icon: Users,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
      },
      {
        id: "rbac-demo",
        title: "Role Permissions",
        url: "/dashboard/rbac",
        icon: ShieldCheck,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    id: "system",
    header: "SYSTEM",
    items: [
      {
        id: "theme-showcase",
        title: "Theme & UI Atoms",
        url: "/dashboard/showcase",
        icon: Palette,
        roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      },
      {
        id: "settings",
        title: "Account Settings",
        url: "/settings",
        icon: Settings,
        roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      },
    ],
  },
];

/**
 * Flattened navigation items list
 */
export const navigationItems = navigationGroups.flatMap((group) => group.items);

/**
 * Filter navigation groups by current user role
 * @param {string} userRole
 * @returns {Array}
 */
export const getAuthorizedNavGroups = (userRole) => {
  if (!userRole) return [];
  return navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.roles || item.roles.includes(userRole),
      ),
    }))
    .filter((group) => group.items.length > 0);
};

/**
 * Filter navigation items by current user role
 * @param {string} userRole
 * @returns {Array}
 */
export const getAuthorizedNavItems = (userRole) => {
  if (!userRole) return [];
  return navigationItems.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );
};

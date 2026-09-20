import React, { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthGuard from "../components/wrappers/AuthGuard";
import RoleGuard from "../components/wrappers/RoleGuard";
import Loadable from "../components/common/Loadable";
import { ROLES } from "../constants/RbacConstants";

const DashboardPage = Loadable(
  lazy(() => import("../pages/dashboard/DashboardPage")),
);
const ThemeShowcasePage = Loadable(
  lazy(() => import("../pages/dashboard/ThemeShowcasePage")),
);
const RbacDemoPage = Loadable(
  lazy(() => import("../pages/dashboard/RbacDemoPage")),
);
const UsersPage = Loadable(lazy(() => import("../pages/users/UsersPage")));
const ProfilePage = Loadable(
  lazy(() => import("../pages/profile/ProfilePage")),
);

export const ProtectedRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "dashboard",
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "showcase",
          element: <ThemeShowcasePage />,
        },
        {
          path: "rbac",
          element: (
            <RoleGuard allowedRoles={[ROLES.ADMIN]} isRoute>
              <RbacDemoPage />
            </RoleGuard>
          ),
        },
      ],
    },
    {
      path: "users",
      element: (
        <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} isRoute>
          <UsersPage />
        </RoleGuard>
      ),
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "settings",
      element: <ProfilePage />,
    },
  ],
};

export default ProtectedRoutes;

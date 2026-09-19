import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import GuestGuard from '../components/wrappers/GuestGuard';
import Loadable from '../components/common/Loadable';

// Lazy-loaded auth pages
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));

/**
 * Guest / Authentication Routes
 * Wrapped in GuestGuard (redirects authenticated users directly to /dashboard)
 */
export const GuestRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <AuthLayout />
    </GuestGuard>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/login" replace />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ],
};

export default GuestRoutes;

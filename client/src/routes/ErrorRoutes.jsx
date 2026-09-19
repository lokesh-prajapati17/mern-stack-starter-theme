import React, { lazy } from 'react';
import Loadable from '../components/common/Loadable';

// Lazy-loaded error and status pages
const NotFoundPage = Loadable(lazy(() => import('../pages/error/NotFoundPage')));
const UnauthorizedPage = Loadable(lazy(() => import('../pages/error/UnauthorizedPage')));

/**
 * Public Error and Fallback Routes
 */
export const ErrorRoutes = [
  {
    path: 'unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default ErrorRoutes;

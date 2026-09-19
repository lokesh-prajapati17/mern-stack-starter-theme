import { createBrowserRouter } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorRoutes from "./ErrorRoutes";

/**
 * Application Master Router (Functional composition)
 * Clean modular architecture separating Guest, Protected, and Error routes.
 */
export const router = createBrowserRouter([
  GuestRoutes,
  ProtectedRoutes,
  ...ErrorRoutes,
]);

export default router;

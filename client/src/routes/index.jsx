import { createBrowserRouter } from "react-router-dom";
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorRoutes from "./ErrorRoutes";

export const router = createBrowserRouter([
  GuestRoutes,
  ProtectedRoutes,
  ...ErrorRoutes,
]);

export default router;

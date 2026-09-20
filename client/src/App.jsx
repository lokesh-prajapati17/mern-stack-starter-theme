import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ThemeCustomization from "./themes";
import { BreakpointProvider } from "./contexts/BreakpointContext";
import { ToastProvider } from "./contexts/ToastContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { fetchCurrentUser } from "./store/slices/authSlice";
import { STORAGE_KEYS } from "./constants/KeyConstants";

export const App = () => {
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        dispatch(fetchCurrentUser());
      }
    }
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <ThemeCustomization>
        <ToastProvider>
          <BreakpointProvider>
            <RouterProvider router={router} />
          </BreakpointProvider>
        </ToastProvider>
      </ThemeCustomization>
    </ErrorBoundary>
  );
};

export default App;

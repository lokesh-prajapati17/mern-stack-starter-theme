import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert, Slide } from "@mui/material";

const ToastContext = createContext(null);

let globalToastHandler = null;

export const showToast = (message, severity = "info", duration = 4000) => {
  if (globalToastHandler) {
    globalToastHandler(message, severity, duration);
  }
};

const SlideTransition = (props) => <Slide {...props} direction="left" />;

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
    duration: 4000,
  });

  const triggerToast = useCallback(
    (message, severity = "info", duration = 4000) => {
      setToast({
        open: true,
        message,
        severity,
        duration,
      });
    },
    [],
  );

  useEffect(() => {
    globalToastHandler = triggerToast;
    return () => {
      globalToastHandler = null;
    };
  }, [triggerToast]);

  const hideToast = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast: triggerToast, hideToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={hideToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
        sx={{ mt: 7 }}
      >
        <Alert
          onClose={hideToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: "100%",
            boxShadow: 4,
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastContext;

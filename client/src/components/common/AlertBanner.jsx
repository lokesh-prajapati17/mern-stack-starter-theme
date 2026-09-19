import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle, Collapse, IconButton, alpha } from "@mui/material";
import { X } from "lucide-react";

/**
 * AlertBanner — Dismissible, themed alert with title and icon support.
 * Wraps MUI Alert with Collapse animation and consistent border styling.
 */
export const AlertBanner = ({
  severity = "info",
  title,
  children,
  dismissible = false,
  icon,
  sx,
  onClose,
  ...props
}) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <Collapse in={visible} unmountOnExit>
      <Alert
        severity={severity}
        icon={icon}
        action={
          dismissible ? (
            <IconButton
              size="small"
              color="inherit"
              onClick={handleDismiss}
              aria-label="Dismiss alert"
            >
              <X size={16} />
            </IconButton>
          ) : null
        }
        sx={{
          borderRadius: (t) => `${t.shape.borderRadius}px`,
          border: (t) =>
            `1px solid ${alpha(
              t.palette[severity]?.main || t.palette.info.main,
              0.3,
            )}`,
          "& .MuiAlert-icon": { alignItems: "center" },
          ...sx,
        }}
        {...props}
      >
        {title && <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>}
        {children}
      </Alert>
    </Collapse>
  );
};

AlertBanner.propTypes = {
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]),
  title: PropTypes.string,
  children: PropTypes.node,
  dismissible: PropTypes.bool,
  icon: PropTypes.node,
  sx: PropTypes.object,
  onClose: PropTypes.func,
};

export default AlertBanner;

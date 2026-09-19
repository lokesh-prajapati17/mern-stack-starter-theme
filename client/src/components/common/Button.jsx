import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, CircularProgress } from "@mui/material";

export const Button = forwardRef(
  (
    {
      children,
      variant = "contained",
      color = "primary",
      size = "medium",
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={
          loading ? (
            <CircularProgress
              size={size === "small" ? 14 : 16}
              color="inherit"
            />
          ) : (
            startIcon
          )
        }
        endIcon={!loading ? endIcon : undefined}
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "inherit",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default Button;

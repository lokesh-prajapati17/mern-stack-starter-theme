import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  IconButton as MuiIconButton,
  Tooltip,
  Box,
  alpha,
} from "@mui/material";

export const IconButton = forwardRef(
  (
    {
      children,
      title,
      placement = "top",
      size = "medium",
      color = "default",
      sx,
      ...props
    },
    ref,
  ) => {
    const isPaletteColor = [
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ].includes(color);

    const button = (
      <MuiIconButton
        ref={ref}
        size={size}
        color={color}
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          transition: "background-color 0.15s ease, color 0.15s ease",
          ...(isPaletteColor && {
            color: (theme) => theme.palette[color].main,
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette[color].main, 0.1),
            },
          }),
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiIconButton>
    );

    const content = props.disabled ? (
      <Box component="span" sx={{ display: "inline-flex" }}>
        {button}
      </Box>
    ) : (
      button
    );

    if (title) {
      return (
        <Tooltip title={title} placement={placement} arrow>
          {content}
        </Tooltip>
      );
    }

    return button;
  },
);

IconButton.displayName = "IconButton";

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  placement: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default IconButton;

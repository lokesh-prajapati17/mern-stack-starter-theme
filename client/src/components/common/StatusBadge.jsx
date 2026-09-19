import React from "react";
import PropTypes from "prop-types";
import { Chip, alpha, useTheme } from "@mui/material";

/**
 * StatusBadge Component (Arrow function)
 * Displays a soft-tone status badge strictly derived from theme semantic palettes.
 */
export const StatusBadge = ({
  status,
  color,
  size = "small",
  sx,
  ...props
}) => {
  const theme = useTheme();

  const resolveColor = () => {
    if (color) return color;
    const lower = String(status).toLowerCase();
    if (
      ["active", "completed", "success", "approved", "online"].includes(lower)
    )
      return "success";
    if (["pending", "in progress", "warning", "review"].includes(lower))
      return "warning";
    if (
      [
        "inactive",
        "failed",
        "error",
        "suspended",
        "cancelled",
        "rejected",
      ].includes(lower)
    )
      return "error";
    if (["info", "processing", "scheduled"].includes(lower)) return "info";
    return "default";
  };

  const badgeColor = resolveColor();

  const getStyle = () => {
    if (badgeColor === "default") {
      return {
        bgcolor: theme.palette.action.hover,
        color: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
      };
    }

    const paletteColor = theme.palette[badgeColor] || theme.palette.primary;
    return {
      bgcolor: alpha(paletteColor.main, 0.12),
      color: paletteColor.main,
      border: `1px solid ${alpha(paletteColor.main, 0.25)}`,
      fontWeight: 600,
    };
  };

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        borderRadius: (t) => t.shape.borderRadius * 0.75,
        ...getStyle(),
        ...sx,
      }}
      {...props}
    />
  );
};

StatusBadge.propTypes = {
  status: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
    "default",
  ]),
  size: PropTypes.oneOf(["small", "medium"]),
  sx: PropTypes.object,
};

export default StatusBadge;

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  LinearProgress,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

/**
 * ProgressBar — Labeled linear progress with percentage and color support.
 * Supports determinate, buffer, and indeterminate modes.
 */
export const ProgressBar = ({
  value = 0,
  label,
  showValue = true,
  color = "primary",
  size = "medium",
  variant = "determinate",
  sx,
}) => {
  const theme = useTheme();
  const paletteColor = theme.palette[color] || theme.palette.primary;

  const heights = { small: 4, medium: 8, large: 12 };
  const height = heights[size] || 8;

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {(label || showValue) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.75,
          }}
        >
          {label && (
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>
          )}
          {showValue && variant === "determinate" && (
            <Typography
              variant="caption"
              fontWeight={700}
              color={paletteColor.main}
            >
              {Math.round(value)}%
            </Typography>
          )}
        </Box>
      )}

      <LinearProgress
        variant={variant}
        value={value}
        sx={{
          height,
          borderRadius: height / 2,
          bgcolor: alpha(paletteColor.main, 0.12),
          "& .MuiLinearProgress-bar": {
            borderRadius: height / 2,
            bgcolor: paletteColor.main,
            backgroundImage: `linear-gradient(90deg, ${paletteColor.main}, ${alpha(paletteColor.light || paletteColor.main, 0.85)})`,
          },
        }}
      />
    </Box>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  showValue: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["determinate", "indeterminate", "buffer"]),
  sx: PropTypes.object,
};

export default ProgressBar;

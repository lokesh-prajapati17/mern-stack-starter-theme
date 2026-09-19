import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  alpha,
  useTheme,
  Skeleton,
} from "@mui/material";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * StatCard — KPI / metric card for dashboards.
 * Shows value, label, trend delta, and an optional icon panel.
 */
export const StatCard = ({
  label,
  value,
  prefix = "",
  suffix = "",
  delta,
  deltaLabel,
  icon: Icon,
  color = "primary",
  loading = false,
  sx,
}) => {
  const theme = useTheme();
  const paletteColor = theme.palette[color] || theme.palette.primary;

  const isPositive = delta > 0;
  const isNegative = delta < 0;
  const TrendIcon = isPositive
    ? TrendingUp
    : isNegative
      ? TrendingDown
      : Minus;
  const trendColor = isPositive
    ? theme.palette.success.main
    : isNegative
      ? theme.palette.error.main
      : theme.palette.text.secondary;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        p: 2.5,
        borderRadius: (t) => `${t.shape.borderRadius}px`,
        border: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
        boxShadow: (t) => t.customShadows?.card || t.shadows[1],
        transition: "box-shadow 0.25s ease",
        "&:hover": {
          boxShadow: (t) => t.customShadows?.cardHover || t.shadows[3],
        },
        ...sx,
      }}
    >
      {/* Text block */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}
          noWrap
        >
          {label}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mt: 0.5 }}>
          {prefix && (
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {prefix}
            </Typography>
          )}
          {loading ? (
            <Skeleton width={80} height={32} />
          ) : (
            <Typography
              variant="h5"
              fontWeight={800}
              lineHeight={1.1}
              sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
            >
              {value}
            </Typography>
          )}
          {suffix && (
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {suffix}
            </Typography>
          )}
        </Box>

        {delta !== undefined && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.4,
              mt: 1,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              bgcolor: alpha(trendColor, 0.1),
              color: trendColor,
            }}
          >
            <TrendIcon size={12} />
            <Typography variant="caption" fontWeight={700} sx={{ lineHeight: 1.3 }}>
              {Math.abs(delta)}%{deltaLabel ? ` ${deltaLabel}` : ""}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Icon panel — hidden on very small mobile to save space */}
      {Icon && (
        <Box
          sx={{
            flexShrink: 0,
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            justifyContent: "center",
            width: { sm: 40, md: 48 },
            height: { sm: 40, md: 48 },
            borderRadius: 2,
            bgcolor: alpha(paletteColor.main, 0.12),
            color: paletteColor.main,
            ml: { sm: 1.5, md: 2 },
          }}
        >
          <Icon size={20} />
        </Box>
      )}
    </Box>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  delta: PropTypes.number,
  deltaLabel: PropTypes.string,
  icon: PropTypes.elementType,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
  ]),
  loading: PropTypes.bool,
  sx: PropTypes.object,
};

export default StatCard;

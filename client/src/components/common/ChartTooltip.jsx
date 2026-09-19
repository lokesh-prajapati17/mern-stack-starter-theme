import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

/**
 * ChartTooltip — Shared themed tooltip for all Recharts-based chart atoms.
 *
 * Usage:
 *   <Tooltip content={<ChartTooltip formatter={(v, name) => `$${v}`} />} />
 *
 * Props passed by Recharts automatically: active, payload, label.
 * Additional props you pass: formatter, dotShape.
 */
export const ChartTooltip = ({
  active,
  payload,
  label,
  formatter,
  dotShape = "circle", // "circle" | "square"
}) => {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: (t) => `${t.shape.borderRadius * 0.75}px`,
        px: 1.5,
        py: 1,
        boxShadow: (t) => t.customShadows?.card || t.shadows[4],
        minWidth: 130,
        pointerEvents: "none",
      }}
    >
      {label !== undefined && label !== null && (
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          sx={{ mb: 0.75, display: "block", textTransform: "none" }}
        >
          {label}
        </Typography>
      )}

      {payload.map((entry, i) => {
        const color = entry.color || entry.payload?.fill;
        const displayValue = formatter
          ? formatter(entry.value, entry.name)
          : entry.value;

        return (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              mb: i < payload.length - 1 ? 0.4 : 0,
            }}
          >
            {/* Swatch */}
            <Box
              sx={{
                width: 8,
                height: 8,
                flexShrink: 0,
                bgcolor: color,
                borderRadius: dotShape === "square" ? 0.5 : "50%",
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ flex: 1, lineHeight: 1.4 }}
            >
              {entry.name}
            </Typography>
            <Typography variant="caption" fontWeight={700} color="text.primary">
              {displayValue}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

ChartTooltip.propTypes = {
  /** Injected by Recharts — whether the tooltip is currently shown */
  active: PropTypes.bool,
  /** Injected by Recharts — array of series data points at the hovered position */
  payload: PropTypes.array,
  /** Injected by Recharts — the x-axis label at the hovered position */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Optional value formatter: (value, name) => string */
  formatter: PropTypes.func,
  /** Shape of the series color swatch: "circle" (default) or "square" */
  dotShape: PropTypes.oneOf(["circle", "square"]),
};

export default ChartTooltip;

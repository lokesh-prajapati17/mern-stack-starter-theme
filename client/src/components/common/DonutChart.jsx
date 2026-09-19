import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

const renderCustomLegend = (props, theme) => {
  const { payload } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1.5,
        mt: 1.5,
      }}
    >
      {payload.map((entry, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: entry.color,
            }}
          />
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {entry.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

/**
 * DonutChart — Pie/Donut chart with center label, themed tooltip, and custom legend.
 * Pass innerRadius > 0 for donut style (default), 0 for full pie.
 */
export const AppDonutChart = ({
  data = [],
  height = 260,
  innerRadius = 60,
  outerRadius = 100,
  centerLabel,
  centerValue,
  formatter,
  showLegend = true,
  sx,
}) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.secondary.main,
    alpha(theme.palette.primary.main, 0.5),
  ];

  return (
    <Box sx={{ width: "100%", position: "relative", userSelect: "none", "& svg": { outline: "none" }, "& svg *": { outline: "none" } }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            nameKey="name"
            paddingAngle={data.length > 1 ? 3 : 0}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.color || defaultColors[i % defaultColors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<ChartTooltip formatter={formatter} />} />

          {showLegend && (
            <Legend
              content={(props) => renderCustomLegend(props, theme)}
              wrapperStyle={{ paddingTop: 0 }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Center label — absolutely positioned over the donut hole */}
      {innerRadius > 0 && (centerLabel || centerValue) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            // Account for legend area (~40px) so center aligns to pie, not whole box
            bottom: showLegend ? 40 : 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {centerValue && (
            <Typography variant="h6" fontWeight={800} lineHeight={1.1}>
              {centerValue}
            </Typography>
          )}
          {centerLabel && (
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              {centerLabel}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

AppDonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  centerLabel: PropTypes.string,
  centerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatter: PropTypes.func,
  showLegend: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppDonutChart;

import React from "react";
import PropTypes from "prop-types";
import { Box, alpha, useTheme } from "@mui/material";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";


/**
 * LineChart — Multi-series line chart with themed grid, axis, tooltip, and legend.
 */
export const AppLineChart = ({
  data = [],
  lines = [],
  height = 280,
  xKey = "name",
  formatter,
  showGrid = true,
  showLegend = true,
  sx,
}) => {
  const theme = useTheme();
  const gridColor = theme.palette.divider;
  const axisColor = theme.palette.text.secondary;

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  return (
    <Box sx={{ width: "100%", userSelect: "none", "& svg": { outline: "none" }, "& svg *": { outline: "none" }, ...sx }}>
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fill: axisColor, fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dx={-4}
          />
          <Tooltip
            content={<ChartTooltip formatter={formatter} />}
            cursor={{ stroke: alpha(theme.palette.primary.main, 0.15), strokeWidth: 1 }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, color: axisColor, paddingTop: 12 }}
            />
          )}
          {lines.map((line, i) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label || line.key}
              stroke={line.color || defaultColors[i % defaultColors.length]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

AppLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
  height: PropTypes.number,
  xKey: PropTypes.string,
  formatter: PropTypes.func,
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppLineChart;

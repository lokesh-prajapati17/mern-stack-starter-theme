import React from "react";
import PropTypes from "prop-types";
import { Box, alpha, useTheme } from "@mui/material";
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";


/**
 * AreaChart — Gradient-filled area chart for trend visualisation.
 */
export const AppAreaChart = ({
  data = [],
  areas = [],
  height = 280,
  xKey = "name",
  formatter,
  showGrid = true,
  showLegend = true,
  stacked = false,
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
    <Box
      sx={{
        width: "100%",
        userSelect: "none",
        "& svg": { outline: "none" },
        "& svg *": { outline: "none" },
        ...sx,
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <ReAreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            {areas.map((area, i) => {
              const color = area.color || defaultColors[i % defaultColors.length];
              return (
                <linearGradient key={area.key} id={`grad-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              );
            })}
          </defs>

          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
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
            <Legend wrapperStyle={{ fontSize: 12, color: axisColor, paddingTop: 12 }} />
          )}
          {areas.map((area, i) => {
            const color = area.color || defaultColors[i % defaultColors.length];
            return (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.label || area.key}
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#grad-${area.key})`}
                stackId={stacked ? "stack" : undefined}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            );
          })}
        </ReAreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

AppAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  areas: PropTypes.arrayOf(
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
  stacked: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppAreaChart;

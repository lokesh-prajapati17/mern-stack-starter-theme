import React from "react";
import PropTypes from "prop-types";
import { Box, alpha, useTheme } from "@mui/material";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

/**
 * BarChart — Grouped or stacked bar chart with rounded bars and theme colors.
 */
export const AppBarChart = ({
  data = [],
  bars = [],
  height = 280,
  xKey = "name",
  formatter,
  showGrid = true,
  showLegend = true,
  stacked = false,
  horizontal = false,
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
    theme.palette.secondary.main,
  ];

  // Single-series: apply per-bar cell coloring from defaultColors for visual variety
  const isSingleSeries = bars.length === 1 && !bars[0].color;

  return (
    <Box sx={{ width: "100%", userSelect: "none", "& svg": { outline: "none" }, "& svg *": { outline: "none" }, ...sx }}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          barCategoryGap="30%"
          barGap={4}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              horizontal={!horizontal}
              vertical={horizontal}
            />
          )}

          {horizontal ? (
            <>
              <XAxis
                type="number"
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
            </>
          ) : (
            <>
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
            </>
          )}

          <Tooltip
            content={<ChartTooltip formatter={formatter} dotShape="square" />}
            cursor={{ fill: alpha(theme.palette.primary.main, 0.06) }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, color: axisColor, paddingTop: 12 }}
            />
          )}

          {bars.map((bar, i) => {
            const color = bar.color || defaultColors[i % defaultColors.length];
            return (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label || bar.key}
                fill={color}
                radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                stackId={stacked ? "stack" : undefined}
                maxBarSize={52}
              >
                {isSingleSeries &&
                  data.map((_, cellIdx) => (
                    <Cell
                      key={cellIdx}
                      fill={defaultColors[cellIdx % defaultColors.length]}
                      fillOpacity={0.85}
                    />
                  ))}
              </Bar>
            );
          })}
        </ReBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

AppBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  bars: PropTypes.arrayOf(
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
  horizontal: PropTypes.bool,
  sx: PropTypes.object,
};

export default AppBarChart;

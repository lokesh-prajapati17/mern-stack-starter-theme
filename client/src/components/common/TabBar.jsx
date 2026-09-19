import React from "react";
import PropTypes from "prop-types";
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  Box,
  alpha,
  useTheme,
} from "@mui/material";

/**
 * TabBar — Styled MUI tabs with pill or underline variants.
 * Pill variant: selected tab gets a filled primary pill; container gets a
 * subtle surface background derived strictly from theme tokens.
 */
export const TabBar = ({
  tabs = [],
  value,
  onChange,
  variant = "underline",
  size = "medium",
  sx,
}) => {
  const theme = useTheme();
  const isPill = variant === "pill";

  // Muted container background for the pill track — works in both modes.
  const pillTrackBg =
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.06)
      : alpha(theme.palette.common.black, 0.06);

  const tabHeight = size === "small" ? 32 : 40;
  const tabFontSize =
    size === "small"
      ? theme.typography.caption.fontSize
      : theme.typography.body2.fontSize;

  return (
    <Box
      sx={{
        ...(isPill
          ? {
              display: "inline-flex",
              bgcolor: pillTrackBg,
              borderRadius: "12px",
              p: "4px",
            }
          : {
              borderBottom: `1px solid ${theme.palette.divider}`,
            }),
        ...sx,
      }}
    >
      <MuiTabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={isPill ? { style: { display: "none" } } : undefined}
        sx={{
          minHeight: "unset",
          "& .MuiTabs-flexContainer": { gap: 0 },
          "& .MuiTabs-scrollButtons": { width: 28 },
        }}
      >
        {tabs.map((tab, idx) => (
          <MuiTab
            key={idx}
            label={tab.label}
            icon={tab.icon}
            iconPosition={tab.iconPosition || "start"}
            disabled={tab.disabled}
            value={tab.value !== undefined ? tab.value : idx}
            sx={{
              minHeight: tabHeight,
              height: tabHeight,
              fontSize: tabFontSize,
              fontWeight: 600,
              textTransform: "none",
              letterSpacing: 0.2,
              px: isPill ? 1.75 : 2,
              py: 0,
              gap: 0.5,
              borderRadius: isPill ? "9px" : 0,
              // Default non-selected colour — always readable
              color: theme.palette.text.secondary,
              transition: "all 0.2s ease",

              // ── Pill: selected state ──────────────────────────────────
              ...(isPill && {
                "&.Mui-selected": {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: `0 1px 6px ${alpha(theme.palette.primary.main, 0.35)}`,
                },
              }),

              // ── Underline: selected state ─────────────────────────────
              ...(!isPill && {
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                },
              }),

              // ── Hover ─────────────────────────────────────────────────
              "&:hover:not(.Mui-selected)": {
                color: theme.palette.text.primary,
                backgroundColor: isPill
                  ? alpha(theme.palette.common.black, 0.04)
                  : alpha(theme.palette.primary.main, 0.06),
              },

              "& .MuiTab-iconWrapper": { mb: "0 !important" },
            }}
          />
        ))}
      </MuiTabs>
    </Box>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
      icon: PropTypes.node,
      iconPosition: PropTypes.oneOf(["start", "end", "top", "bottom"]),
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(["underline", "pill"]),
  size: PropTypes.oneOf(["small", "medium"]),
  sx: PropTypes.object,
};

export default TabBar;

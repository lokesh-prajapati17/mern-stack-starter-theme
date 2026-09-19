/**
 * Tabs Component Overrides
 */
export const Tabs = (theme) => {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: theme.palette.primary.main,
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          minWidth: 80,
          padding: "12px 16px",
          color: theme.palette.text.secondary,
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  };
};

export default Tabs;

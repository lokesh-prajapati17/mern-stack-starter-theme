/**
 * Tooltip Component Overrides
 */
export const Tooltip = (theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[900],
          color: "#ffffff",
          fontSize: "0.75rem",
          fontWeight: 500,
          borderRadius: 6,
          padding: "4px 8px",
        },
        arrow: {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[900],
        },
      },
    },
  };
};

export default Tooltip;

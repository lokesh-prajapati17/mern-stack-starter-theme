/**
 * Switch Component Overrides
 */
export const Switch = (theme) => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 24,
          padding: 0,
        },
        switchBase: {
          padding: 3,
          "&.Mui-checked": {
            transform: "translateX(18px)",
            color: "#FFFFFF",
            "& + .MuiSwitch-track": {
              backgroundColor: theme.palette.primary.main,
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: {
          width: 18,
          height: 18,
          borderRadius: 9,
          boxShadow: "0 2px 4px 0 rgba(0, 35, 11, 0.2)",
        },
        track: {
          borderRadius: 12,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[300],
          boxSizing: "border-box",
        },
      },
    },
  };
};

export default Switch;

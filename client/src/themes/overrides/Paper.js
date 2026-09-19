/**
 * Paper Component Overrides
 */
export const Paper = (theme) => {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: theme.palette.background.paper,
        },
        rounded: {
          borderRadius: 10,
        },
        outlined: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
};

export default Paper;

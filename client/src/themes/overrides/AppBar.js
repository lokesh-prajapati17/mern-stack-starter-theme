/**
 * AppBar Component Overrides
 */
export const AppBar = (theme) => {
  return {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.header,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        },
      },
    },
  };
};

export default AppBar;

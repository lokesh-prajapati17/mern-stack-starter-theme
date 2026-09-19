/**
 * Badge Component Overrides
 */
export const Badge = (theme) => {
  return {
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: "0.6875rem",
          fontWeight: 700,
          height: 18,
          minWidth: 18,
          padding: "0 4px",
        },
      },
    },
  };
};

export default Badge;

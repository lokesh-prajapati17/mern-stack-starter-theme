/**
 * Design Tokens - Near-Black + Cyan API/Fintech Design System
 * Enterprise Design Tokens Architecture
 */

export const primaryScale = {
  50: "#E6FFFE",
  100: "#BFFFFC",
  200: "#80F8F3",
  300: "#4CEDE7",
  400: "#22E3DB",
  500: "#00DAD1", // Main Dark
  600: "#00C1BA",
  700: "#00A7A1",
  800: "#008C87",
  900: "#006F6B",
  950: "#003D3B",
};

export const darkNeutralScale = {
  0: "#FFFFFF",
  50: "#F7F9FB",
  100: "#E5ECF3",
  200: "#CBD5E1",
  300: "#AAB6C4",
  400: "#8A98A8",
  500: "#738092",
  600: "#5D6978",
  700: "#465363",
  800: "#303B49",
  900: "#1E2936",
  950: "#101722",
  1000: "#060B14",
  1100: "#02060C",
  1200: "#010306",
  1300: "#000000",
};

export const lightNeutralScale = {
  0: "#FFFFFF",
  50: "#F8FAFC",
  100: "#F1F5F8",
  200: "#E5EBF0",
  300: "#D5DEE6",
  400: "#B8C4CF",
  500: "#98A6B5",
  600: "#788797",
  700: "#5D6978",
  800: "#3E4B59",
  900: "#25313D",
  950: "#15202B",
};

export const successScale = {
  50: "#ECFFF1",
  100: "#D4FBDD",
  200: "#A9F1B8",
  300: "#7CE394",
  400: "#5ED47A", // Main Dark
  500: "#43C765",
  600: "#36B85A",
  700: "#299747", // Main Light
  800: "#22763A",
  900: "#1D6032",
  950: "#0B2914",
};

export const warningScale = {
  50: "#FFF9E8",
  100: "#FFF0C7",
  200: "#FFE09A",
  300: "#F9CE70",
  400: "#F5B83D", // Main Dark
  500: "#E8A82C",
  600: "#D2931C",
  700: "#B27614", // Main Light
  800: "#8B5D14",
  900: "#684715",
  950: "#332308",
};

export const errorScale = {
  50: "#FFF0F1",
  100: "#FFDDE0",
  200: "#FFBFC5",
  300: "#FF929B",
  400: "#F58289",
  500: "#F05D67", // Main Dark
  600: "#DF4652",
  700: "#C93C47", // Main Light
  800: "#A6313A",
  900: "#862B33",
  950: "#421519",
};

export const infoScale = {
  50: "#EDF8FF",
  100: "#D8F0FF",
  200: "#B5E2FF",
  300: "#80C9FF",
  400: "#4DB6FF", // Main Dark
  500: "#2A9EEB",
  600: "#1688D4", // Main Light
  700: "#1270B2",
  800: "#155B8D",
  900: "#174C74",
  950: "#0A273D",
};

export const darkSurfaces = {
  base: "#02060C",
  1: "#060B14",
  2: "#09111B",
  3: "#0D1622",
  4: "#111C29",
  hover: "#0B1420",
  active: "#101D2B",
  selected: "#082329",
  elevated: "#0A121D",
  overlay: "#0E1723",
  sidebar: "#010306",
};

export const lightSurfaces = {
  base: "#F1F5F9",
  1: "#FFFFFF",
  2: "#F8FAFC",
  3: "#F1F5F9",
  4: "#E2E8F0",
  hover: "#F1F5F9",
  active: "#E2E8F0",
  selected: "#E6F7F6",
  elevated: "#FFFFFF",
  overlay: "#FFFFFF",
  sidebar: "#FFFFFF",
};

export const darkBorders = {
  subtle: "#0D1622",
  default: "#161F2C",
  strong: "#243142",
  hover: "#304052",
  primary: "#007F7A",
  primaryStrong: "#00DAD1",
  success: "#286C3A",
  warning: "#765719",
  error: "#713038",
};

export const lightBorders = {
  subtle: "#EDF2F7",
  default: "#E2E8F0",
  strong: "#CBD5E1",
  hover: "#94A3B8",
  primary: "#5EEAD4",
  primaryStrong: "#008781",
  success: "#86EFAC",
  warning: "#FDE047",
  error: "#FCA5A5",
};

export const tokens = {
  dark: {
    background: {
      app: "#02060C",
      sidebar: "#010306",
      surface: "#060B14",
      elevated: "#0A121D",
      hover: "#0B1420",
      selected: "#082329",
    },
    surface: darkSurfaces,
    border: darkBorders,
    text: {
      primary: "#E5ECF3",
      secondary: "#738092",
      tertiary: "#536171",
      disabled: "#3C4856",
      inverse: "#02060C",
    },
    brand: {
      cyan: "#00DAD1",
      cyanLight: "#33E2DB",
      cyanDark: "#00AAA3",
      cyanAccent: "#22E3DB",
    },
    status: {
      success: "#5ED47A",
      warning: "#F5B83D",
      error: "#F05D67",
      info: "#4DB6FF",
    },
  },
  light: {
    background: {
      app: "#F1F5F9",
      sidebar: "#FFFFFF",
      surface: "#FFFFFF",
      elevated: "#FFFFFF",
      hover: "#F1F5F9",
      selected: "#E6F7F6",
    },
    surface: lightSurfaces,
    border: lightBorders,
    text: {
      primary: "#0F172A",
      secondary: "#475569",
      tertiary: "#64748B",
      disabled: "#94A3B8",
      inverse: "#FFFFFF",
    },
    brand: {
      cyan: "#008781",
      cyanLight: "#00AFA9",
      cyanDark: "#005E59",
      cyanAccent: "#5EEAD4",
    },
    status: {
      success: "#16A34A",
      warning: "#D97706",
      error: "#DC2626",
      info: "#0284C7",
    },
  },
};

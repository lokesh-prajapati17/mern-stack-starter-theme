import {
  primaryScale,
  darkNeutralScale,
  lightNeutralScale,
  successScale,
  warningScale,
  errorScale,
  infoScale,
  darkSurfaces,
  lightSurfaces,
  darkBorders,
  lightBorders,
  tokens,
} from "./tokens";

/**
 * MUI Palette Builder for Styled Architecture (Arrow function)
 * @param {'dark' | 'light'} mode
 */
export const themePalette = (mode = "dark") => {
  const isDark = mode === "dark";
  const neutral = isDark ? darkNeutralScale : lightNeutralScale;
  const surfaces = isDark ? darkSurfaces : lightSurfaces;
  const borders = isDark ? darkBorders : lightBorders;
  const currentTokens = isDark ? tokens.dark : tokens.light;

  return {
    mode,
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    primary: {
      ...primaryScale,
      main: isDark ? "#00DAD1" : "#008781",
      light: isDark ? "#33E2DB" : "#00AFA9",
      dark: isDark ? "#00AAA3" : "#005E59",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: isDark ? "#64748B" : "#475569",
      light: isDark ? "#94A3B8" : "#64748B",
      dark: isDark ? "#475569" : "#334155",
      contrastText: "#FFFFFF",
    },
    success: {
      ...successScale,
      main: isDark ? "#5ED47A" : "#16A34A",
      light: isDark ? "#86E49A" : "#22C55E",
      dark: isDark ? "#36B85A" : "#15803D",
      contrastText: "#FFFFFF",
    },
    warning: {
      ...warningScale,
      main: isDark ? "#F5B83D" : "#D97706",
      light: isDark ? "#F8CA6A" : "#F59E0B",
      dark: isDark ? "#C88A16" : "#B45309",
      contrastText: "#FFFFFF",
    },
    error: {
      ...errorScale,
      main: isDark ? "#F05D67" : "#DC2626",
      light: isDark ? "#F58289" : "#EF4444",
      dark: isDark ? "#C93C47" : "#B91C1C",
      contrastText: "#FFFFFF",
    },
    info: {
      ...infoScale,
      main: isDark ? "#4DB6FF" : "#0284C7",
      light: isDark ? "#80C9FF" : "#38BDF8",
      dark: isDark ? "#1688D4" : "#0369A1",
      contrastText: "#FFFFFF",
    },
    grey: {
      ...neutral,
    },
    text: {
      primary: isDark ? "#E5ECF3" : "#0F172A",
      secondary: isDark ? "#738092" : "#475569",
      disabled: isDark ? "#465363" : "#94A3B8",
      tertiary: isDark ? "#536171" : "#64748B",
      inverse: isDark ? "#02060C" : "#FFFFFF",
    },
    divider: isDark ? "#161F2C" : "#E2E8F0",
    border: {
      ...borders,
    },
    background: {
      paper: isDark ? "#060B14" : "#FFFFFF",
      default: isDark ? "#02060C" : "#F1F5F9",
      surface: surfaces[1],
      elevated: surfaces.elevated,
      overlay: surfaces.overlay,
      sidebar: surfaces.sidebar,
      header: isDark ? "rgba(2, 6, 12, 0.85)" : "rgba(255, 255, 255, 0.92)",
      code: isDark ? "#1E2936" : "#E2E8F0",
    },
    gradients: {
      heading: isDark
        ? "linear-gradient(180deg, #FFFFFF 0%, #AAB6C4 100%)"
        : "linear-gradient(180deg, #0F172A 0%, #475569 100%)",
      primary: isDark
        ? "linear-gradient(135deg, #00DAD1 0%, #008C87 100%)"
        : "linear-gradient(135deg, #00AFA9 0%, #006F6B 100%)",
      surface: isDark
        ? "linear-gradient(180deg, #060B14 0%, #02060C 100%)"
        : "linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)",
      cyanGlow: isDark
        ? "radial-gradient(circle at 50% 0%, rgba(0, 218, 209, 0.15) 0%, transparent 70%)"
        : "radial-gradient(circle at 50% 0%, rgba(0, 135, 129, 0.1) 0%, transparent 70%)",
    },
    action: {
      active: isDark ? "#00DAD1" : "#008781",
      hover: isDark ? "rgba(0, 218, 209, 0.08)" : "rgba(0, 135, 129, 0.06)",
      hoverOpacity: 0.08,
      selected: isDark ? "#082329" : "#E6F7F6",
      selectedOpacity: 0.16,
      disabled: isDark ? "#465363" : "#94A3B8",
      disabledBackground: isDark
        ? "rgba(255, 255, 255, 0.06)"
        : "rgba(0, 0, 0, 0.04)",
      focus: isDark ? "rgba(0, 218, 209, 0.24)" : "rgba(0, 135, 129, 0.2)",
    },
    custom: {
      surfaces,
      borders,
      tokens: currentTokens,
      neutral,
    },
  };
};

export default themePalette;

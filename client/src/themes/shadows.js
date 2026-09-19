/**
 * Custom Shadows Generator for Dark/Light Mode (Arrow function)
 * Provides subtle elevation and colored glow effects
 */

export const createThemeShadows = (mode = "dark") => {
  const isDark = mode === "dark";

  // Standard 25 MUI shadows array
  const shadows = Array(25).fill("none");
  shadows[0] = "none";

  if (isDark) {
    shadows[1] = "0px 1px 2px 0px rgba(0, 0, 0, 0.45)";
    shadows[2] = "0px 2px 4px 0px rgba(0, 0, 0, 0.5)";
    shadows[3] =
      "0px 4px 8px -2px rgba(0, 0, 0, 0.55), 0px 2px 4px -2px rgba(0, 0, 0, 0.35)";
    shadows[4] =
      "0px 6px 12px -2px rgba(0, 0, 0, 0.6), 0px 3px 6px -3px rgba(0, 0, 0, 0.4)";
    shadows[8] =
      "0px 8px 16px -4px rgba(0, 0, 0, 0.65), 0px 4px 8px -4px rgba(0, 0, 0, 0.45)";
    shadows[12] =
      "0px 12px 24px -4px rgba(0, 0, 0, 0.7), 0px 6px 12px -6px rgba(0, 0, 0, 0.5)";
    shadows[16] =
      "0px 16px 32px -4px rgba(0, 0, 0, 0.75), 0px 8px 16px -8px rgba(0, 0, 0, 0.55)";
    shadows[24] =
      "0px 24px 48px -6px rgba(0, 0, 0, 0.8), 0px 12px 24px -8px rgba(0, 0, 0, 0.6)";
  } else {
    shadows[1] = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)";
    shadows[2] =
      "0px 2px 4px -1px rgba(16, 24, 40, 0.06), 0px 1px 2px -1px rgba(16, 24, 40, 0.04)";
    shadows[3] =
      "0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 2px 4px -2px rgba(16, 24, 40, 0.03)";
    shadows[4] =
      "0px 6px 10px -2px rgba(16, 24, 40, 0.06), 0px 3px 6px -3px rgba(16, 24, 40, 0.04)";
    shadows[8] =
      "0px 8px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)";
    shadows[12] =
      "0px 12px 20px -4px rgba(16, 24, 40, 0.08), 0px 6px 10px -3px rgba(16, 24, 40, 0.04)";
    shadows[16] =
      "0px 16px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 12px -4px rgba(16, 24, 40, 0.05)";
    shadows[24] =
      "0px 24px 36px -6px rgba(16, 24, 40, 0.12), 0px 12px 18px -6px rgba(16, 24, 40, 0.06)";
  }

  // Fill in any blanks with safe defaults
  for (let i = 0; i < 25; i++) {
    if (!shadows[i] || shadows[i] === "none") {
      if (i > 0 && i < 4) shadows[i] = shadows[2] || shadows[1];
      else if (i >= 4 && i < 8) shadows[i] = shadows[4];
      else if (i >= 8 && i < 12) shadows[i] = shadows[8];
      else if (i >= 12 && i < 16) shadows[i] = shadows[12];
      else if (i >= 16 && i < 24) shadows[i] = shadows[16];
      else if (i === 24) shadows[i] = shadows[24];
    }
  }

  return shadows;
};

export const createCustomShadows = (mode = "dark") => {
  const isDark = mode === "dark";

  return {
    button: isDark
      ? "0 2px 6px 0 rgba(0, 218, 209, 0.25)"
      : "0 2px 6px 0 rgba(0, 175, 169, 0.2)",
    card: isDark
      ? "0px 2px 8px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px #161F2C"
      : "0px 2px 8px rgba(16, 24, 40, 0.06), 0px 0px 0px 1px #DCE3EA",
    cardHover: isDark
      ? "0px 8px 24px rgba(0, 0, 0, 0.55), 0px 0px 0px 1px #243142"
      : "0px 8px 24px rgba(16, 24, 40, 0.1), 0px 0px 0px 1px #C7D1DA",
    dropdown: isDark
      ? "0px 10px 30px rgba(0, 0, 0, 0.65), 0px 0px 0px 1px #161F2C"
      : "0px 10px 30px rgba(16, 24, 40, 0.12), 0px 0px 0px 1px #DCE3EA",
    dialog: isDark
      ? "0px 24px 48px rgba(0, 0, 0, 0.75), 0px 0px 0px 1px #243142"
      : "0px 24px 48px rgba(16, 24, 40, 0.16), 0px 0px 0px 1px #DCE3EA",
    primary: isDark
      ? "0 0 16px rgba(0, 218, 209, 0.35)"
      : "0 0 16px rgba(0, 175, 169, 0.3)",
    success: isDark
      ? "0 0 16px rgba(94, 212, 122, 0.35)"
      : "0 0 16px rgba(41, 158, 74, 0.3)",
    warning: isDark
      ? "0 0 16px rgba(245, 184, 61, 0.35)"
      : "0 0 16px rgba(201, 135, 13, 0.3)",
    error: isDark
      ? "0 0 16px rgba(240, 93, 103, 0.35)"
      : "0 0 16px rgba(214, 69, 80, 0.3)",
    info: isDark
      ? "0 0 16px rgba(77, 182, 255, 0.35)"
      : "0 0 16px rgba(22, 136, 212, 0.3)",
  };
};

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import themePalette from "./palette";
import themeTypography from "./typography";
import { createThemeShadows, createCustomShadows } from "./shadows";
import componentOverrides from "./overrides";

/**
 * Build MUI theme instance based on current mode and customization (Arrow function)
 * @param {'dark' | 'light'} mode
 * @param {object} customization
 */
export const createCustomTheme = (mode = "dark", customization = {}) => {
  const palette = themePalette(mode);
  const typography = themeTypography(customization.fontFamily);
  const shadows = createThemeShadows(mode);
  const customShadows = createCustomShadows(mode);

  const themeOptions = {
    palette,
    typography,
    shadows,
    customShadows,
    shape: {
      borderRadius: customization.borderRadius || 10,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  };

  let theme = createTheme(themeOptions);
  theme = responsiveFontSizes(theme);
  theme.components = componentOverrides(theme);

  return theme;
};

export default createCustomTheme;

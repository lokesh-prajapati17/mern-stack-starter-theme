import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/KeyConstants";

const getInitialMode = () => {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (e) {
    return "light";
  }
};

const initialState = {
  mode: getInitialMode(),
  fontFamily:
    "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  borderRadius: 10,
  isMini: false,
};

const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      try {
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, action.payload);
      } catch (e) {}
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, state.mode);
      } catch (e) {}
    },
    setMiniDrawer: (state, action) => {
      state.isMini = action.payload;
    },
    toggleMiniDrawer: (state) => {
      state.isMini = !state.isMini;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
  },
});

export const {
  setThemeMode,
  toggleThemeMode,
  setMiniDrawer,
  toggleMiniDrawer,
  setBorderRadius,
  setFontFamily,
} = customizationSlice.actions;

export const selectCustomization = (state) => state.customization;
export const selectThemeMode = (state) => state.customization.mode;
export const selectIsMiniDrawer = (state) => state.customization.isMini;

export default customizationSlice.reducer;

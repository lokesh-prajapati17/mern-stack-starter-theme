import { useDispatch, useSelector } from "react-redux";
import {
  selectThemeMode,
  toggleThemeMode,
  setThemeMode,
} from "../store/slices/customizationSlice";

/**
 * Hook for consuming and toggling the active theme mode (light / dark)
 */
export const useThemeMode = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const isDark = mode === "dark";

  const toggle = () => dispatch(toggleThemeMode());
  const setMode = (newMode) => dispatch(setThemeMode(newMode));

  return {
    mode,
    isDark,
    toggle,
    setMode,
  };
};

export default useThemeMode;

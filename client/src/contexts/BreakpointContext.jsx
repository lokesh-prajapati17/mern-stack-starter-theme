import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const BreakpointContext = createContext(null);

export const BreakpointProvider = ({ children }) => {
  const theme = useTheme();

  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Sidebar Drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMini, setIsMini] = useState(false);

  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);
  const toggleMobile = useCallback(() => setIsMobileOpen((prev) => !prev), []);
  const toggleMini = useCallback(() => setIsMini((prev) => !prev), []);

  const value = useMemo(
    () => ({
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isMdDown,
      isLgUp,
      drawer: {
        isMobileOpen,
        isMini,
        openMobile,
        closeMobile,
        toggleMobile,
        toggleMini,
        setIsMini,
      },
    }),
    [
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isMdDown,
      isLgUp,
      isMobileOpen,
      isMini,
      openMobile,
      closeMobile,
      toggleMobile,
      toggleMini,
    ],
  );

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

BreakpointProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error("useBreakpoint must be used within a BreakpointProvider");
  }
  return context;
};

export default BreakpointContext;

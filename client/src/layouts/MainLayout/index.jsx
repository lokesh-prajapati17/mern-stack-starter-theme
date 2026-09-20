import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { LAYOUT_CONSTANTS } from "../../constants/LayoutConstants";
import { useBreakpoint } from "../../contexts/BreakpointContext";

export const MainLayout = () => {
  const { isLgUp, drawer } = useBreakpoint();

  const sidebarWidth = isLgUp
    ? drawer.isMini
      ? LAYOUT_CONSTANTS.DRAWER_WIDTH_MINI
      : LAYOUT_CONSTANTS.DRAWER_WIDTH_EXPANDED
    : 0;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Full-Height Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Container */}
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: `calc(100% - ${sidebarWidth}px)` },
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Fixed Header positioned to the right of the desktop Sidebar */}
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: `calc(100% - ${sidebarWidth}px)`,
            },
            position: "fixed",
            top: 0,
            left: { xs: 0, lg: `${sidebarWidth}px` },
            zIndex: (theme) => theme.zIndex.appBar,
            transition:
              "left 225ms cubic-bezier(0.4, 0, 0.2, 1), width 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Header />
        </Box>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            minWidth: 0,
            pt: {
              xs: `${LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE + 16}px`,
              md: `${LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP + 20}px`,
            },
            pb: 6,
            px: { xs: 1.5, sm: 2.5, md: 3.5, lg: 4 },
            overflowX: "hidden",
          }}
        >
          <Container maxWidth="xl" disableGutters sx={{ width: "100%" }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

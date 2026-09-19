import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { LAYOUT_CONSTANTS } from "../../constants/LayoutConstants";

/**
 * Master Main Layout Container (Arrow function)
 * Fixed Header across the entire top + Seamless Sidebar underneath with zero gap.
 */
export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Fixed Header spanning across the entire top of the viewport */}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Header />
      </Box>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          minWidth: 0,
          minHeight: "100vh",
          pt: {
            xs: `${LAYOUT_CONSTANTS.HEADER_HEIGHT_MOBILE + 16}px`,
            md: `${LAYOUT_CONSTANTS.HEADER_HEIGHT_DESKTOP + 20}px`,
          },
          pb: 6,
          px: { xs: 1.5, sm: 2.5, md: 3.5, lg: 4 },
          overflowX: "hidden",
          transition: "padding 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Container maxWidth="xl" disableGutters sx={{ width: "100%" }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;

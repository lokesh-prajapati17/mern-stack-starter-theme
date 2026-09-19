import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";

/**
 * 403 Unauthorized / Forbidden Page (Arrow function)
 */
export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: (t) => t.palette.action.hover,
          color: "error.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <ShieldAlert size={44} />
      </Box>

      <Typography variant="h3" fontWeight={800} gutterBottom>
        Access Denied
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 480, mb: 4 }}
      >
        You do not have the required role or permissions to view this resource.
        Contact your administrator if you believe this is an error.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Home size={18} />}
          onClick={() => navigate("/dashboard")}
        >
          Return to Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default UnauthorizedPage;

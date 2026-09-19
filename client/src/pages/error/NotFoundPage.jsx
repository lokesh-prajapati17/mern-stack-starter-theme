import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { Home, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";

/**
 * 404 NotFound Page (Arrow function)
 */
export const NotFoundPage = () => {
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
      <Typography
        variant="h1"
        fontWeight={900}
        sx={{
          fontSize: { xs: "6rem", sm: "8rem" },
          lineHeight: 1,
          background: (theme) =>
            theme.palette.gradients?.primary || theme.palette.primary.main,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 480, mb: 4 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
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
          Back to Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;

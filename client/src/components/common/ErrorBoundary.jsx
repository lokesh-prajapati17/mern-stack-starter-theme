import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            bgcolor: "background.default",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: 520,
              width: "100%",
              p: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "error.light",
                color: "error.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2.5,
              }}
            >
              <AlertTriangle size={32} />
            </Box>

            <Typography variant="h4" fontWeight={800} gutterBottom>
              Something Went Wrong
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              An unexpected error occurred in the application interface.
              You can try refreshing the page or returning to the dashboard.
            </Typography>

            {this.state.error?.message && (
              <Box
                sx={{
                  p: 1.5,
                  mb: 3,
                  bgcolor: "action.hover",
                  borderRadius: 1.5,
                  fontFamily: "monospace",
                  fontSize: "0.8125rem",
                  color: "error.main",
                  textAlign: "left",
                  overflowX: "auto",
                }}
              >
                {this.state.error.message}
              </Box>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                startIcon={<RefreshCw size={18} />}
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
              <Button
                variant="contained"
                startIcon={<Home size={18} />}
                onClick={() => {
                  this.handleReset();
                  window.location.href = "/dashboard";
                }}
              >
                Back to Dashboard
              </Button>
            </Stack>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Stack, Alert, Divider } from "@mui/material";
import {
  ShieldCheck,
  Lock,
  Unlock,
  Users,
  Settings,
  Trash2,
} from "lucide-react";
import {
  selectCurrentUser,
  setCredentials,
} from "../../store/slices/authSlice";
import { ROLES, ROLE_PERMISSIONS } from "../../constants/RbacConstants";
import { CardBox } from "../../components/common/CardBox";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Button } from "../../components/common/Button";
import { RoleGuard } from "../../components/wrappers/RoleGuard";
import { MotionFadeIn } from "../../components/common/Motion";

/**
 * RBAC Access Demo Page (Arrow function)
 */
export const RbacDemoPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const currentRole = user?.role || ROLES.ADMIN;

  const handleSwitchRole = (newRole) => {
    dispatch(
      setCredentials({
        user: {
          ...user,
          role: newRole,
          name: `${newRole} User`,
        },
        token: "mock_token",
      }),
    );
  };

  const userPermissions = ROLE_PERMISSIONS[currentRole] || [];

  return (
    <MotionFadeIn>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Role-Based Access Control (RBAC) Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Demonstrates hierarchical permission filtering and inline RoleGuard
          component authorization.
        </Typography>

        {/* Current Role Switcher Bar */}
        <CardBox sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Simulate Role Change
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Switch role below to observe inline buttons and sections adapt
                automatically:
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Button
                variant={currentRole === ROLES.ADMIN ? "contained" : "outlined"}
                color="primary"
                fullWidth
                sx={{ flex: { sm: 1, md: "initial" } }}
                onClick={() => handleSwitchRole(ROLES.ADMIN)}
              >
                Admin (Full Access)
              </Button>
              <Button
                variant={
                  currentRole === ROLES.MANAGER ? "contained" : "outlined"
                }
                color="secondary"
                fullWidth
                sx={{ flex: { sm: 1, md: "initial" } }}
                onClick={() => handleSwitchRole(ROLES.MANAGER)}
              >
                Manager
              </Button>
              <Button
                variant={currentRole === ROLES.USER ? "contained" : "outlined"}
                color="info"
                fullWidth
                sx={{ flex: { sm: 1, md: "initial" } }}
                onClick={() => handleSwitchRole(ROLES.USER)}
              >
                User (Limited)
              </Button>
            </Stack>
          </Box>
        </CardBox>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "5fr 7fr",
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
            width: "100%",
          }}
        >
          {/* Current Permissions List */}
          <Box sx={{ width: "100%" }}>
            <CardBox
              title="Assigned Permissions"
              subtitle={`Permissions granted to current role: ${currentRole}`}
            >
              <Stack spacing={1}>
                {userPermissions.map((perm) => (
                  <Box
                    key={perm}
                    sx={{
                      p: 1.25,
                      borderRadius: (t) => `${t.shape.borderRadius * 0.75}px`,
                      bgcolor: "action.hover",
                      border: (t) => `1px solid ${t.palette.divider}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <ShieldCheck
                      size={16}
                      color="var(--mui-palette-success-main, #10B981)"
                    />
                    <Typography
                      variant="body2"
                      fontFamily="monospace"
                      fontWeight={600}
                    >
                      {perm}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardBox>
          </Box>

          {/* Inline RoleGuard Demonstration */}
          <Box sx={{ width: "100%" }}>
            <CardBox
              title="Inline Component Guards"
              subtitle="Components conditionally rendered based on <RoleGuard allowedRoles={[...]}>"
            >
              <Stack spacing={2.5}>
                {/* Admin Only Action */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: (t) => `${t.shape.borderRadius}px`,
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Admin Only Action (e.g. Delete System Data)
                  </Typography>
                  <RoleGuard
                    allowedRoles={[ROLES.ADMIN]}
                    fallback={
                      <Alert severity="info" icon={<Lock size={18} />}>
                        This action requires <strong>Admin</strong> privileges.
                        Current role: {currentRole}.
                      </Alert>
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Trash2 size={16} />}
                      >
                        Delete System Records
                      </Button>
                      <StatusBadge
                        status="Unlocked"
                        color="success"
                        size="small"
                      />
                    </Box>
                  </RoleGuard>
                </Box>

                {/* Manager or Admin Action */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: (t) => `${t.shape.borderRadius}px`,
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Manager & Admin Action (e.g. Export Reports)
                  </Typography>
                  <RoleGuard
                    allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}
                    fallback={
                      <Alert severity="warning" icon={<Lock size={18} />}>
                        Locked: Requires <strong>Manager</strong> or{" "}
                        <strong>Admin</strong>.
                      </Alert>
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Users size={16} />}
                      >
                        Export User Directory
                      </Button>
                      <StatusBadge
                        status="Unlocked"
                        color="success"
                        size="small"
                      />
                    </Box>
                  </RoleGuard>
                </Box>

                {/* General User Action */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: (t) => `${t.shape.borderRadius}px`,
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Public / All Roles Action
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button variant="outlined" color="primary">
                      View Profile & Activity
                    </Button>
                    <StatusBadge
                      status="Available to All"
                      color="info"
                      size="small"
                    />
                  </Box>
                </Box>
              </Stack>
            </CardBox>
          </Box>
        </Box>
      </Box>
    </MotionFadeIn>
  );
};

export default RbacDemoPage;

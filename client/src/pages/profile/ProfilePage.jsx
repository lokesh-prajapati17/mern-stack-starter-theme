import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  User,
  Shield,
  KeyRound,
  Mail,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle,
  Save,
  Lock,
} from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  selectCurrentUser,
  fetchCurrentUser,
} from "../../store/slices/authSlice";
import AuthService from "../../services/AuthService";
import { showToast } from "../../contexts/ToastContext";
import {
  Button,
  IconButton,
  CardBox,
  StatusBadge,
  Avatar,
  PageHeader,
  TabBar,
  AlertBanner,
  MotionFadeIn,
} from "../../components/common";
import { FormikTextInput } from "../../components/form/fields/FormikTextInput";

const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
});

const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const ProfilePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState(0);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const profileTabs = [
    {
      label: "Personal Information",
      icon: <User size={18} />,
      value: 0,
    },
    {
      label: "Security & Password",
      icon: <KeyRound size={18} />,
      value: 1,
    },
  ];

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      const res = await AuthService.updateProfile({ name: values.name });
      if (res?.success) {
        showToast(res.message || "Profile updated successfully", "success");
        dispatch(fetchCurrentUser());
      } else {
        showToast(res?.message || "Failed to update profile", "error");
      }
    } catch (err) {
      showToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await AuthService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (res?.success) {
        showToast(res.message || "Password changed successfully", "success");
        resetForm();
      } else {
        showToast(res?.message || "Failed to change password", "error");
      }
    } catch (err) {
      showToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MotionFadeIn>
      <Box sx={{ mb: 4 }}>
        {/* Page Header with Breadcrumbs */}
        <PageHeader
          title="Account Settings"
          subtitle="Manage your personal profile details, account security, and credentials."
          breadcrumbs={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Settings" },
          ]}
        />

        <Grid container spacing={3}>
          {/* Left Column: Account Overview Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CardBox sx={{ textAlign: "center", p: 3 }}>
              <Avatar
                name={user?.name}
                src={user?.avatar}
                size={88}
                status={user?.status === "Active" ? "online" : "offline"}
                statusSize={14}
                sx={{ mx: "auto", mb: 2 }}
              />

              <Typography variant="h5" fontWeight={700} gutterBottom>
                {user?.name || "User Account"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user?.email || "user@example.com"}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ mb: 3 }}
              >
                <StatusBadge status={user?.role || "User"} color="primary" />
                <StatusBadge
                  status={user?.status || "Active"}
                  color="success"
                />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              <Stack spacing={2} sx={{ textAlign: "left" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Mail size={18} color={theme.palette.text.secondary} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user?.email || "-"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Shield size={18} color={theme.palette.text.secondary} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Access Role
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user?.role || "User"}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Calendar size={18} color={theme.palette.text.secondary} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Member Since
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "Recent"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardBox>
          </Grid>

          {/* Right Column: Settings Tabs */}
          <Grid size={{ xs: 12, md: 8 }}>
            <CardBox sx={{ p: 0, overflow: "hidden" }}>
              <Box sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}>
                <TabBar
                  tabs={profileTabs}
                  value={activeTab}
                  onChange={(_, val) => setActiveTab(val)}
                  variant="underline"
                />
              </Box>

              <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                {/* Tab 0: Personal Info Form */}
                {activeTab === 0 && (
                  <Formik
                    initialValues={{
                      name: user?.name || "",
                      email: user?.email || "",
                    }}
                    validationSchema={profileValidationSchema}
                    enableReinitialize
                    onSubmit={handleUpdateProfile}
                  >
                    {({ handleSubmit, isSubmitting }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <AlertBanner severity="info" sx={{ mb: 3 }}>
                          Your full name is used across dashboards, data tables,
                          and audit histories.
                        </AlertBanner>

                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          Profile Details
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          Update your display name. Your email address is linked
                          to your authentication credentials.
                        </Typography>

                        <Stack spacing={2.5} sx={{ maxWidth: 520, mb: 4 }}>
                          <FormikTextInput
                            name="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                          />
                          <FormikTextInput
                            name="email"
                            label="Email Address"
                            disabled
                            helperText="Email address cannot be changed directly."
                          />
                        </Stack>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          loading={isSubmitting}
                          startIcon={<Save size={18} />}
                        >
                          Save Changes
                        </Button>
                      </Form>
                    )}
                  </Formik>
                )}

                {/* Tab 1: Password Change Form */}
                {activeTab === 1 && (
                  <Formik
                    initialValues={{
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }}
                    validationSchema={passwordValidationSchema}
                    onSubmit={handleChangePassword}
                  >
                    {({ handleSubmit, isSubmitting }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <AlertBanner
                          severity="warning"
                          title="Security Requirement"
                          sx={{ mb: 3 }}
                        >
                          Passwords must be at least 6 characters. Avoid reusing
                          old passwords across other accounts.
                        </AlertBanner>

                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          Change Password
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          Ensure your account stays protected by updating your
                          password periodically.
                        </Typography>

                        <Stack spacing={2.5} sx={{ maxWidth: 520, mb: 4 }}>
                          <FormikTextInput
                            name="currentPassword"
                            label="Current Password"
                            type={showCurrentPass ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            endIcon={
                              <IconButton
                                size="small"
                                title={
                                  showCurrentPass
                                    ? "Hide password"
                                    : "Show password"
                                }
                                onClick={() =>
                                  setShowCurrentPass(!showCurrentPass)
                                }
                              >
                                {showCurrentPass ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </IconButton>
                            }
                          />

                          <FormikTextInput
                            name="newPassword"
                            label="New Password"
                            type={showNewPass ? "text" : "password"}
                            placeholder="••••••••"
                            helperText="Must be at least 6 characters long"
                            required
                            endIcon={
                              <IconButton
                                size="small"
                                title={
                                  showNewPass
                                    ? "Hide password"
                                    : "Show password"
                                }
                                onClick={() => setShowNewPass(!showNewPass)}
                              >
                                {showNewPass ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </IconButton>
                            }
                          />

                          <FormikTextInput
                            name="confirmPassword"
                            label="Confirm New Password"
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            endIcon={
                              <IconButton
                                size="small"
                                title={
                                  showConfirmPass
                                    ? "Hide password"
                                    : "Show password"
                                }
                                onClick={() =>
                                  setShowConfirmPass(!showConfirmPass)
                                }
                              >
                                {showConfirmPass ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </IconButton>
                            }
                          />
                        </Stack>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          loading={isSubmitting}
                          startIcon={<CheckCircle size={18} />}
                        >
                          Update Password
                        </Button>
                      </Form>
                    )}
                  </Formik>
                )}
              </Box>
            </CardBox>
          </Grid>
        </Grid>
      </Box>
    </MotionFadeIn>
  );
};

export default ProfilePage;

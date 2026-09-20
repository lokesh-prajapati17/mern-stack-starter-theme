import React, { useState } from "react";
import { Box, Typography, Stack, Divider, Grid } from "@mui/material";
import {
  Send,
  Trash2,
  Bell,
  Sparkles,
  Users,
  BarChart2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  Package,
} from "lucide-react";
import {
  Button,
  IconButton,
  TextInput,
  SelectInput,
  SearchInput,
  CheckboxInput,
  SwitchInput,
  StatusBadge,
  CardBox,
  Modal,
  ConfirmDialog,
  EmptyState,
  // ── New Atoms ──
  Avatar,
  AvatarGroup,
  AlertBanner,
  StatCard,
  ProgressBar,
  PageHeader,
  TabBar,
  StepProgress,
  SidePanel,
  SkeletonLoader,
  TagList,
  FileDropzone,
  // ── Charts ──
  AppLineChart,
  AppAreaChart,
  AppBarChart,
  AppDonutChart,
  // ── Form Engine & Multi-Step Wizard ──
  DynamicForm,
  FormWizard,
  userProfileSchema,
  wizardStep1Schema,
  wizardStep2Schema,
  wizardStep3Schema,
} from "../../components/common";
import { MotionFadeIn } from "../../components/common/Motion";

/** Section label helper */
const SectionLabel = ({ children }) => (
  <Typography
    variant="caption"
    fontWeight={700}
    color="text.secondary"
    sx={{ textTransform: "uppercase", letterSpacing: 1 }}
  >
    {children}
  </Typography>
);

/**
 * ThemeShowcasePage — Full UI component library demo page.
 * Every atom and molecule is shown with an interactive live example.
 */
export const ThemeShowcasePage = () => {
  // ── Existing state ──────────────────────────────────────────────────────────
  const [textValue, setTextValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("active");
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [switchValue, setSwitchValue] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ── New component state ─────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(0);
  const [activePillTab, setActivePillTab] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [dynamicFormSubmitted, setDynamicFormSubmitted] = useState(null);

  const selectOptions = [
    { value: "active", label: "Active State" },
    { value: "pending", label: "Pending Review" },
    { value: "inactive", label: "Inactive / Archived" },
  ];

  const handleTestLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1500);
  };

  const mockUsers = [
    { name: "Alex Vance", avatar: "" },
    { name: "Sarah Kim", avatar: "" },
    { name: "Jordan Lee", avatar: "" },
    { name: "Morgan P.", avatar: "" },
    { name: "Taylor R.", avatar: "" },
    { name: "Casey W.", avatar: "" },
  ];

  const underlineTabs = [
    { label: "Overview", icon: <LayoutDashboard size={15} /> },
    { label: "Analytics", icon: <BarChart2 size={15} /> },
    { label: "Settings", icon: <Settings size={15} /> },
  ];

  const pillTabs = [
    { label: "All" },
    { label: "Active" },
    { label: "Archived" },
    { label: "Drafts" },
  ];

  const steps = [
    { label: "Account Details" },
    { label: "Business Info" },
    { label: "Billing Setup" },
    { label: "Review & Submit" },
  ];

  return (
    <MotionFadeIn>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <PageHeader
        title="UI Atoms & Theme Showcase"
        subtitle="Every reusable component — styled exclusively via MUI theme tokens. Zero hardcoded colors or margins."
        breadcrumbs={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Showcase" },
        ]}
        actions={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Sparkles size={16} />}
          >
            All Components
          </Button>
        }
      />

      {/* ── Alert Banners ────────────────────────────────────────────────── */}
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <AlertBanner severity="info" title="New Feature" dismissible>
          The component library has been extended with 11 new production atoms.
        </AlertBanner>
        <AlertBanner severity="success" dismissible>
          All components are theme-aware and support dark / light mode
          automatically.
        </AlertBanner>
        <AlertBanner severity="warning" title="Heads Up" dismissible>
          Always import from <code>../../components/common</code> barrel — never
          directly from MUI.
        </AlertBanner>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
        }}
      >
        {/* ── Stat Cards ───────────────────────────────────────────────── */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <CardBox
            title="Stat Cards"
            subtitle="KPI metric cards with trend delta, icon panel, and skeleton loading"
            divider
          >
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {[
                {
                  label: "Total Revenue",
                  value: "84,320",
                  prefix: "$",
                  delta: 12.4,
                  deltaLabel: "vs last month",
                  icon: DollarSign,
                  color: "primary",
                },
                {
                  label: "Active Users",
                  value: "3,842",
                  delta: 5.7,
                  deltaLabel: "this week",
                  icon: Users,
                  color: "success",
                },
                {
                  label: "Conversion Rate",
                  value: "4.6",
                  suffix: "%",
                  delta: -1.2,
                  deltaLabel: "vs yesterday",
                  icon: TrendingUp,
                  color: "warning",
                },
                {
                  label: "Open Tickets",
                  value: "127",
                  delta: 0,
                  deltaLabel: "no change",
                  icon: Package,
                  color: "error",
                },
              ].map((stat, i) => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={i}>
                  <StatCard {...stat} />
                </Grid>
              ))}
              {/* Loading skeleton — full-width demo row on xs/md, quarter on lg */}
              <Grid item xs={12} md={12} lg={3}>
                <StatCard
                  label="Loading State"
                  value="—"
                  icon={BarChart2}
                  loading
                />
              </Grid>
            </Grid>
          </CardBox>
        </Box>

        {/* ── Buttons ──────────────────────────────────────────────────── */}
        <CardBox
          title="Button Atoms"
          subtitle="Variants, sizes, and states"
          divider
        >
          <Stack spacing={2.5}>
            <SectionLabel>Variants & Colors</SectionLabel>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Send size={16} />}
              >
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Trash2 size={16} />}
              >
                Danger
              </Button>
              <Button variant="contained" color="warning">
                Warning
              </Button>
            </Box>

            <SectionLabel>Outlined & Text</SectionLabel>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="outlined" color="secondary">
                Neutral
              </Button>
              <Button variant="text" color="primary">
                Text Button
              </Button>
            </Box>

            <SectionLabel>States</SectionLabel>
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
                color="primary"
                loading={btnLoading}
                onClick={handleTestLoading}
              >
                Click for Loading
              </Button>
              <Button variant="contained" color="primary" disabled>
                Disabled
              </Button>
              <IconButton title="Notification" color="primary">
                <Bell size={18} />
              </IconButton>
            </Box>
          </Stack>
        </CardBox>

        {/* ── Form Inputs ──────────────────────────────────────────────── */}
        <CardBox
          title="Input Atoms"
          subtitle="Themed form controls with validation states"
          divider
        >
          <Stack spacing={2.5}>
            <TextInput
              label="Standard Text Input"
              placeholder="Enter custom value..."
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              startIcon={<Sparkles size={18} />}
            />
            <SearchInput
              placeholder="Search resources..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
            />
            <SelectInput
              label="Select Filter"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={selectOptions}
            />
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <CheckboxInput
                label="Active Checkbox"
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
              />
              <SwitchInput
                label="Toggle Switch"
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
              />
            </Box>
          </Stack>
        </CardBox>

        {/* ── Avatar & AvatarGroup ─────────────────────────────────────── */}
        <CardBox
          title="Avatar & AvatarGroup"
          subtitle="User avatars with status dots and stacked group views"
          divider
        >
          <Stack spacing={2.5}>
            <SectionLabel>Individual Avatars with Status</SectionLabel>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Avatar name="Alex Vance" size={48} status="online" />
              <Avatar name="Sarah Kim" size={48} status="away" />
              <Avatar name="Jordan Lee" size={48} status="busy" />
              <Avatar name="Morgan P." size={48} status="offline" />
              <Avatar size={48} />
            </Box>

            <Divider />

            <SectionLabel>Avatar Group</SectionLabel>
            <AvatarGroup users={mockUsers} max={4} size={38} />
          </Stack>
        </CardBox>

        {/* ── Status Badges ────────────────────────────────────────────── */}
        <CardBox
          title="Status Badges"
          subtitle="Semantic chips auto-resolved from theme palette"
          divider
        >
          <Stack spacing={2}>
            <SectionLabel>All Severities</SectionLabel>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <StatusBadge status="Active" color="success" />
              <StatusBadge status="Pending Review" color="warning" />
              <StatusBadge status="Suspended" color="error" />
              <StatusBadge status="Processing" color="info" />
              <StatusBadge status="Admin Role" color="primary" />
              <StatusBadge status="Archived" color="default" />
            </Box>
            <SectionLabel>Tag List (chips)</SectionLabel>
            <TagList
              tags={[
                "React",
                "Node.js",
                "MongoDB",
                "Express",
                "REST API",
                "JWT",
              ]}
              color="primary"
              maxVisible={5}
            />
            <TagList
              tags={["TypeScript", "GraphQL", "Redis", "Docker"]}
              color="success"
            />
          </Stack>
        </CardBox>

        {/* ── Progress Bars ────────────────────────────────────────────── */}
        <CardBox
          title="Progress Bars"
          subtitle="Labeled linear progress with gradient fill and size variants"
          divider
        >
          <Stack spacing={2.5}>
            <ProgressBar
              label="Storage Used"
              value={72}
              color="primary"
              size="medium"
            />
            <ProgressBar
              label="CPU Load"
              value={45}
              color="success"
              size="medium"
            />
            <ProgressBar
              label="Memory"
              value={88}
              color="error"
              size="medium"
            />
            <ProgressBar
              label="Upload"
              value={30}
              color="warning"
              size="large"
            />
            <Divider />
            <SectionLabel>Indeterminate</SectionLabel>
            <ProgressBar
              variant="indeterminate"
              label="Loading data..."
              showValue={false}
              color="info"
              size="small"
            />
          </Stack>
        </CardBox>

        {/* ── Skeleton Loaders ─────────────────────────────────────────── */}
        <CardBox
          title="Skeleton Loaders"
          subtitle="5 presets that match real component layouts — prevents layout shift"
          divider
        >
          <Stack spacing={3}>
            <Box>
              <SectionLabel>Stat Skeleton</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <SkeletonLoader variant="stat" />
              </Box>
            </Box>
            <Box>
              <SectionLabel>Profile Skeleton</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <SkeletonLoader variant="profile" />
              </Box>
            </Box>
            <Box>
              <SectionLabel>List Skeleton (3 rows)</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <SkeletonLoader variant="list" rows={3} />
              </Box>
            </Box>
            <Box>
              <SectionLabel>Table Skeleton</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <SkeletonLoader variant="table" rows={4} />
              </Box>
            </Box>
          </Stack>
        </CardBox>

        {/* ── TabBar ───────────────────────────────────────────────────── */}
        <CardBox
          title="Tab Bar"
          subtitle="Underline and pill variants with icon support"
          divider
        >
          <Stack spacing={3}>
            <Box>
              <SectionLabel>Underline Tabs</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <TabBar
                  tabs={underlineTabs}
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  variant="underline"
                />
              </Box>
            </Box>
            <Divider />
            <Box>
              <SectionLabel>Pill Tabs</SectionLabel>
              <Box sx={{ mt: 1 }}>
                <TabBar
                  tabs={pillTabs}
                  value={activePillTab}
                  onChange={(_, v) => setActivePillTab(v)}
                  variant="pill"
                />
              </Box>
            </Box>
          </Stack>
        </CardBox>

        {/* ── Step Progress ────────────────────────────────────────────── */}
        <CardBox
          title="Step Progress"
          subtitle="Multi-step wizard indicator with themed connector and check-mark"
          divider
        >
          <Stack spacing={3}>
            <StepProgress
              steps={steps}
              activeStep={activeStep}
              alternativeLabel
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={activeStep === steps.length - 1}
                onClick={() =>
                  setActiveStep((s) => Math.min(steps.length - 1, s + 1))
                }
              >
                {activeStep === steps.length - 2 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Stack>
        </CardBox>

        {/* ── File Dropzone ────────────────────────────────────────────── */}
        <CardBox
          title="File Dropzone"
          subtitle="Drag-and-drop file upload with file list and remove — no library dependencies"
          divider
        >
          <FileDropzone
            multiple
            helperText="PNG, JPG, PDF up to 10 MB"
            files={droppedFiles}
            onDrop={(files) => setDroppedFiles((prev) => [...prev, ...files])}
            onRemove={(idx) =>
              setDroppedFiles((prev) => prev.filter((_, i) => i !== idx))
            }
          />
        </CardBox>

        {/* ── Schema-Driven Dynamic Form Engine (Full Width) ────────────────────────── */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <CardBox
            title="Declarative Dynamic Form Engine"
            subtitle="Schema-driven form generation with instant Yup validation, auto-layout, and Formik state"
            divider
          >
            {dynamicFormSubmitted && (
              <AlertBanner
                severity="success"
                sx={{ mb: 2.5 }}
                onClose={() => setDynamicFormSubmitted(null)}
              >
                Profile successfully validated & updated:{" "}
                {dynamicFormSubmitted.name} ({dynamicFormSubmitted.email}) —
                Role: {dynamicFormSubmitted.role}
              </AlertBanner>
            )}
            <DynamicForm
              fields={[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  required: true,
                  grid: { xs: 12, sm: 6 },
                  placeholder: "Alex Vance",
                },
                {
                  name: "email",
                  label: "Work Email",
                  type: "email",
                  required: true,
                  grid: { xs: 12, sm: 6 },
                  placeholder: "alex.vance@company.io",
                },
                {
                  name: "role",
                  label: "Platform Role",
                  type: "select",
                  required: true,
                  grid: { xs: 12, sm: 6 },
                  options: [
                    { value: "Admin", label: "Admin" },
                    { value: "Manager", label: "Manager" },
                    { value: "User", label: "User" },
                  ],
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  type: "text",
                  grid: { xs: 12, sm: 6 },
                  placeholder: "+1 (555) 000-0000",
                },
                {
                  name: "bio",
                  label: "Biography",
                  type: "textarea",
                  grid: { xs: 12 },
                  placeholder: "Brief executive summary...",
                  rows: 3,
                },
                {
                  name: "notifications",
                  label: "Email Notifications",
                  description:
                    "Receive instant updates on team activity and security alerts",
                  type: "switch",
                  grid: { xs: 12 },
                },
              ]}
              validationSchema={userProfileSchema}
              initialValues={{
                name: "Alex Vance",
                email: "alex.vance@company.io",
                phone: "+1 (555) 123-4567",
                role: "Admin",
                bio: "Lead Systems Architect & Enterprise Theme Specialist",
                notifications: true,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setDynamicFormSubmitted(values);
                setSubmitting(false);
              }}
              submitLabel="Save via Dynamic Form"
              showReset
            />
          </CardBox>
        </Box>

        {/* ── Enterprise Multi-Step Form Wizard (Full Width) ────────────────────────── */}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <CardBox
            title="Enterprise Multi-Step Form Wizard"
            subtitle="Multi-step progression with strict per-step Yup validation, step progress bar, and state persistence"
            divider
          >
            <FormWizard
              steps={[
                {
                  id: "company",
                  label: "Company Details",
                  description: "Tell us about your organization and work email",
                  validationSchema: wizardStep1Schema,
                  fields: [
                    {
                      name: "companyName",
                      label: "Company Name",
                      type: "text",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      placeholder: "demo pvt. ltd.",
                    },
                    {
                      name: "workEmail",
                      label: "Work Email",
                      type: "email",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      placeholder: "contact@demo.com",
                    },
                    {
                      name: "teamSize",
                      label: "Team Size",
                      type: "select",
                      required: true,
                      grid: { xs: 12 },
                      options: [
                        { value: "1-10", label: "1 - 10 employees" },
                        { value: "11-50", label: "11 - 50 employees" },
                        { value: "51-200", label: "51 - 200 employees" },
                        { value: "201+", label: "201+ enterprise" },
                      ],
                    },
                  ],
                },
                {
                  id: "role",
                  label: "Role & Goals",
                  description:
                    "Define your departmental focus and primary objective",
                  validationSchema: wizardStep2Schema,
                  fields: [
                    {
                      name: "roleTitle",
                      label: "Job Title",
                      type: "text",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      placeholder: "Head of Product",
                    },
                    {
                      name: "department",
                      label: "Department",
                      type: "select",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      options: [
                        { value: "engineering", label: "Engineering & Tech" },
                        { value: "product", label: "Product & Design" },
                        { value: "finance", label: "Finance & Operations" },
                        { value: "marketing", label: "Marketing & Growth" },
                      ],
                    },
                    {
                      name: "primaryGoal",
                      label: "Primary Goal",
                      type: "select",
                      required: true,
                      grid: { xs: 12 },
                      options: [
                        {
                          value: "build_app",
                          label: "Build enterprise dashboard from boilerplate",
                        },
                        {
                          value: "team_portal",
                          label: "Internal employee management system",
                        },
                        { value: "saas_mvp", label: "Rapid SaaS MVP launch" },
                      ],
                    },
                  ],
                },
                {
                  id: "plan",
                  label: "Plan & Confirmation",
                  description:
                    "Select subscription tier and finalize registration",
                  validationSchema: wizardStep3Schema,
                  fields: [
                    {
                      name: "plan",
                      label: "Subscription Tier",
                      type: "select",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      options: [
                        { value: "starter", label: "Starter (Free Tier)" },
                        { value: "pro", label: "Professional ($49/mo)" },
                        { value: "enterprise", label: "Enterprise Custom" },
                      ],
                    },
                    {
                      name: "billingCycle",
                      label: "Billing Cycle",
                      type: "select",
                      required: true,
                      grid: { xs: 12, sm: 6 },
                      options: [
                        { value: "monthly", label: "Monthly Billing" },
                        { value: "annual", label: "Annual Billing (20% Off)" },
                      ],
                    },
                    {
                      name: "agreePolicies",
                      label:
                        "I confirm all details are accurate and accept platform policies",
                      type: "checkbox",
                      grid: { xs: 12 },
                    },
                  ],
                },
              ]}
              initialValues={{
                companyName: "demo pvt. ltd",
                workEmail: "admin@demo.io",
                teamSize: "11-50",
                roleTitle: "Staff Software Engineer",
                department: "engineering",
                primaryGoal: "build_app",
                plan: "pro",
                billingCycle: "annual",
                agreePolicies: true,
              }}
              onSubmit={async () => {
                await new Promise((resolve) => setTimeout(resolve, 600));
              }}
              submitLabel="Complete Onboarding"
              completedMessage="Your enterprise organization and workspace configuration have been successfully initialized!"
            />
          </CardBox>
        </Box>

        {/* ── Modals & Dialogs ─────────────────────────────────────────── */}
        <CardBox
          title="Modal, Confirm Dialog & Side Panel"
          subtitle="Accessible, theme-elevated overlays"
          divider
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setModalOpen(true)}
            >
              Open Modal
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => setConfirmOpen(true)}
            >
              Confirm Dialog
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setSidePanelOpen(true)}
            >
              Side Panel
            </Button>
          </Stack>
        </CardBox>

        {/* ── Charts ───────────────────────────────────────────────────── */}

        {/* Line Chart */}
        <CardBox
          title="Line Chart"
          subtitle="Multi-series trend — revenue vs active users over 7 months"
          divider
        >
          <AppLineChart
            data={[
              { month: "Jan", revenue: 4200, users: 2100 },
              { month: "Feb", revenue: 5800, users: 2800 },
              { month: "Mar", revenue: 5100, users: 3200 },
              { month: "Apr", revenue: 7400, users: 3900 },
              { month: "May", revenue: 6900, users: 4100 },
              { month: "Jun", revenue: 8300, users: 4800 },
              { month: "Jul", revenue: 9100, users: 5200 },
            ]}
            xKey="month"
            lines={[
              { key: "revenue", label: "Revenue ($)" },
              { key: "users", label: "Active Users" },
            ]}
            formatter={(v) => v.toLocaleString()}
            height={240}
          />
        </CardBox>

        {/* Area Chart */}
        <CardBox
          title="Area Chart"
          subtitle="Gradient-fill trend — sign-ups vs churn over time"
          divider
        >
          <AppAreaChart
            data={[
              { month: "Jan", signups: 320, churn: 80 },
              { month: "Feb", signups: 480, churn: 60 },
              { month: "Mar", signups: 410, churn: 95 },
              { month: "Apr", signups: 590, churn: 70 },
              { month: "May", signups: 680, churn: 55 },
              { month: "Jun", signups: 720, churn: 40 },
              { month: "Jul", signups: 810, churn: 48 },
            ]}
            xKey="month"
            areas={[
              { key: "signups", label: "Sign-ups" },
              { key: "churn", label: "Churn" },
            ]}
            height={240}
          />
        </CardBox>

        {/* Bar Chart */}
        <CardBox
          title="Bar Chart"
          subtitle="Grouped bars — quarterly actual vs target revenue"
          divider
        >
          <AppBarChart
            data={[
              { name: "Q1", actual: 4200, target: 5000 },
              { name: "Q2", actual: 6800, target: 6500 },
              { name: "Q3", actual: 5900, target: 7000 },
              { name: "Q4", actual: 8100, target: 8000 },
            ]}
            xKey="name"
            bars={[
              { key: "actual", label: "Actual" },
              { key: "target", label: "Target" },
            ]}
            height={240}
          />
        </CardBox>

        {/* Donut Chart */}
        <CardBox
          title="Donut Chart"
          subtitle="Account distribution by plan tier"
          divider
        >
          <AppDonutChart
            data={[
              { name: "Enterprise", value: 42 },
              { name: "Pro", value: 28 },
              { name: "Starter", value: 18 },
              { name: "Free", value: 12 },
            ]}
            centerValue="100%"
            centerLabel="Accounts"
            formatter={(v) => `${v}%`}
            height={260}
          />
        </CardBox>

        {/* ── Empty State ──────────────────────────────────────────────── */}
        <Box sx={{ gridColumn: "1 / -1", width: "100%" }}>
          <CardBox
            title="Empty State Pattern"
            subtitle="Used when tables or lists contain zero items"
            divider
          >
            <EmptyState
              title="No Records Found"
              description="This empty state inherits theme surfaces, borders, and typography. Click below to create your first record."
              actionText="Create Record"
              onAction={() => setModalOpen(true)}
            />
          </CardBox>
        </Box>
      </Box>

      {/* ── Overlays ─────────────────────────────────────────────────────── */}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Theme-Driven Modal"
        subtitle="This dialog inherits theme surface elevations and borders."
        actions={
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(false)}
            >
              Save Changes
            </Button>
          </Stack>
        }
      >
        <AlertBanner severity="info" sx={{ mb: 2 }}>
          You can embed any atom inside this modal.
        </AlertBanner>
        <TextInput label="Sample Field" placeholder="Type here..." fullWidth />
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        type="danger"
        title="Confirm Deletion"
        message="Are you sure you want to delete this resource? This action cannot be undone."
        confirmText="Yes, Delete"
      />

      {/* Side Panel with Dynamic Form Engine */}
      <SidePanel
        open={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        title="User Details"
        subtitle="View and edit user profile with real-time Yup validation"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
          <Avatar name="Alex Vance" size={56} status="online" />
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Alex Vance
            </Typography>
            <Typography variant="caption" color="text.secondary">
              alex.vance@company.io
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2.5 }} />

        <DynamicForm
          fields={[
            {
              name: "name",
              label: "Full Name",
              type: "text",
              required: true,
              grid: { xs: 12 },
              placeholder: "Alex Vance",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              grid: { xs: 12 },
              placeholder: "alex.vance@company.io",
            },
            {
              name: "role",
              label: "Role",
              type: "select",
              required: true,
              grid: { xs: 12 },
              options: [
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "User", label: "User" },
              ],
            },
            {
              name: "phone",
              label: "Phone",
              type: "text",
              grid: { xs: 12 },
              placeholder: "+1 555 000 0000",
            },
          ]}
          validationSchema={userProfileSchema}
          initialValues={{
            name: "Alex Vance",
            email: "alex.vance@company.io",
            role: "Admin",
            phone: "+1 555 123 4567",
          }}
          onSubmit={(values) => {
            setSidePanelOpen(false);
          }}
          submitLabel="Save Changes"
          cancelLabel="Cancel"
          onCancel={() => setSidePanelOpen(false)}
        >
          <Box sx={{ my: 2 }}>
            <SectionLabel>Assigned Tags</SectionLabel>
            <TagList
              tags={["Admin", "Finance", "Engineering"]}
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>
          <Box sx={{ mb: 1 }}>
            <SectionLabel>Progress</SectionLabel>
            <ProgressBar
              label="Profile Completion"
              value={80}
              color="success"
              sx={{ mt: 1 }}
            />
          </Box>
        </DynamicForm>
      </SidePanel>
    </MotionFadeIn>
  );
};

export default ThemeShowcasePage;

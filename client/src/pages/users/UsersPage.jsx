import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Avatar, alpha, useTheme } from "@mui/material";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "./services/users.api";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "./services/constants";
import { Button } from "../../components/common/Button";
import { IconButton } from "../../components/common/IconButton";
import { SearchInput } from "../../components/common/SearchInput";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Modal } from "../../components/common/Modal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { DataTable } from "../../components/common/DataTable";
import { RoleGuard } from "../../components/wrappers/RoleGuard";
import { ROLES, USER_STATUS } from "../../constants/RbacConstants";
import { MotionFadeIn } from "../../components/common/Motion";
import { useDebounce } from "../../hooks/useDebounce";
import {
  FormikTextInput,
  FormikSelectInput,
} from "../../components/form/fields";

const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
});

export const UsersPage = () => {
  const theme = useTheme();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [modal, setModal] = useState({ type: null, data: null });
  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  const [options] = useState({
    roles: USER_ROLE_OPTIONS,
    statuses: USER_STATUS_OPTIONS,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersApi({
        page: pagination.page,
        limit: pagination.limit,
        search: debouncedSearch,
      });

      if (res?.users) {
        setUsers(res.users);
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            totalItems: res.pagination.total || 0,
            totalPages: res.pagination.totalPages || 1,
          }));
        }
      } else if (Array.isArray(res)) {
        setUsers(res);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, pagination.page, pagination.limit]);

  const handleSaveUser = async (values, { setSubmitting, resetForm }) => {
    try {
      if (modal.type === "edit") {
        const updated = await updateUserApi(modal.data._id, values);
        if (updated) {
          fetchUsers();
        }
      } else {
        const created = await createUserApi(values);
        if (created) {
          fetchUsers();
        }
      }
      resetForm();
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modal.data) return;
    const success = await deleteUserApi(modal.data._id);
    if (success) {
      fetchUsers();
    }
    closeModal();
  };

  const columns = [
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (_, row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.8125rem",
            }}
          >
            {row.name?.charAt(0) || "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (r) => <StatusBadge status={r} color="primary" />,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (s) => <StatusBadge status={s} />,
    },
    {
      key: "createdAt",
      label: "Created Date",
      sortable: true,
      render: (date) => (
        <Typography variant="body2" color="text.secondary">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </Typography>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (_, row) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 0.5,
          }}
        >
          <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <IconButton
              size="small"
              title="Edit User"
              onClick={() => openModal("edit", row)}
              color="success"
            >
              <Edit2 size={16} />
            </IconButton>
          </RoleGuard>

          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <IconButton
              size="small"
              title="Delete User"
              color="error"
              onClick={() => openModal("delete", row)}
            >
              <Trash2 size={16} />
            </IconButton>
          </RoleGuard>
        </Box>
      ),
    },
  ];

  return (
    <MotionFadeIn>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              User Directory
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage accounts, assigned roles, and permission levels with the
              common DataTable.
            </Typography>
          </Box>

          <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ width: { sm: "auto" } }}
              startIcon={<UserPlus size={18} />}
              onClick={() => openModal("add")}
            >
              Add New User
            </Button>
          </RoleGuard>
        </Box>

        <Box sx={{ mb: 2.5, width: "100%", maxWidth: { xs: "100%", md: 420 } }}>
          <SearchInput
            placeholder="Search by name or email..."
            value={search}
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />
        </Box>

        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          pagination={{
            page: pagination.page,
            totalPages: pagination.totalPages,
            totalItems: pagination.totalItems,
            rowsPerPage: pagination.limit,
            rowsPerPageOptions: [5, 10, 25],
            onPageChange: (newPage) =>
              setPagination((prev) => ({ ...prev, page: newPage })),
            onRowsPerPageChange: (newLimit) =>
              setPagination((prev) => ({
                ...prev,
                page: 1,
                limit: newLimit,
              })),
          }}
          emptyTitle="No Users Found"
          emptyDescription="Try adjusting your search criteria or add a new user."
        />

        <Formik
          initialValues={{
            name: modal.data?.name || "",
            email: modal.data?.email || "",
            role: modal.data?.role || ROLES.USER,
            status: modal.data?.status || USER_STATUS.ACTIVE,
          }}
          validationSchema={userValidationSchema}
          enableReinitialize
          onSubmit={handleSaveUser}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Modal
              open={modal.type === "add" || modal.type === "edit"}
              onClose={closeModal}
              title={
                modal.type === "edit" ? "Edit User Profile" : "Add New User"
              }
              actions={
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {modal.type === "edit" ? "Save Updates" : "Create User"}
                  </Button>
                </Stack>
              }
            >
              <Form noValidate>
                <Stack spacing={2.5}>
                  <FormikTextInput
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    required
                  />
                  <FormikTextInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                  <FormikSelectInput
                    name="role"
                    label="Role"
                    options={options.roles}
                    required
                  />
                  <FormikSelectInput
                    name="status"
                    label="Account Status"
                    options={options.statuses}
                    required
                  />
                </Stack>
              </Form>
            </Modal>
          )}
        </Formik>

        {modal.type === "delete" && (
          <ConfirmDialog
            open={modal.type === "delete"}
            onClose={closeModal}
            onConfirm={handleDeleteConfirm}
            type="danger"
            title="Delete Account"
            message={`Are you sure you want to delete user "${modal.data?.name}"?`}
            confirmText="Yes, Delete User"
          />
        )}
      </Box>
    </MotionFadeIn>
  );
};

export default UsersPage;

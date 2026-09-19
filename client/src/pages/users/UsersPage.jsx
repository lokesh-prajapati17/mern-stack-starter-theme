import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Stack, Avatar, alpha, useTheme } from "@mui/material";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import UserService from "../../services/UserService";
import { CardBox } from "../../components/common/CardBox";
import { Button } from "../../components/common/Button";
import { IconButton } from "../../components/common/IconButton";
import { SearchInput } from "../../components/common/SearchInput";
import { StatusBadge } from "../../components/common/StatusBadge";
import { Modal } from "../../components/common/Modal";
import { TextInput } from "../../components/common/TextInput";
import { SelectInput } from "../../components/common/SelectInput";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { DataTable } from "../../components/common/DataTable";
import { RoleGuard } from "../../components/wrappers/RoleGuard";
import { ROLES, USER_STATUS } from "../../constants/RbacConstants";
import { MotionFadeIn } from "../../components/common/Motion";

// Initial Mock Seed Data
const initialUsers = [
  {
    _id: "1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    _id: "2",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    role: ROLES.MANAGER,
    status: USER_STATUS.ACTIVE,
    createdAt: "2026-03-02T11:30:00Z",
  },
  {
    _id: "3",
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
    createdAt: "2026-03-03T14:15:00Z",
  },
  {
    _id: "4",
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    role: ROLES.USER,
    status: USER_STATUS.INACTIVE,
    createdAt: "2026-03-04T09:45:00Z",
  },
  {
    _id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    role: ROLES.MANAGER,
    status: USER_STATUS.ACTIVE,
    createdAt: "2026-03-05T08:20:00Z",
  },
  {
    _id: "6",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    role: ROLES.USER,
    status: USER_STATUS.SUSPENDED,
    createdAt: "2026-03-06T13:10:00Z",
  },
  {
    _id: "7",
    name: "Liam Johnson",
    email: "liam.j@example.com",
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
    createdAt: "2026-03-07T16:05:00Z",
  },
];

/**
 * Users Directory Management Page (Arrow function)
 * Implements the reusable DataTable with sorting & pagination.
 */
export const UsersPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES.USER);
  const [status, setStatus] = useState(USER_STATUS.ACTIVE);

  // Attempt live API fetch if backend is online
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await UserService.getUsers();
        if (res.data?.users && res.data.users.length > 0) {
          setUsers(res.data.users);
        }
      } catch (err) {
        // Graceful fallback to initial seeds
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setRole(ROLES.USER);
    setStatus(USER_STATUS.ACTIVE);
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!name || !email) return;

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id ? { ...u, name, email, role, status } : u,
        ),
      );
    } else {
      const newUser = {
        _id: String(Date.now()),
        name,
        email,
        role,
        status,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [newUser, ...prev]);
    }

    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.user) {
      setUsers((prev) => prev.filter((u) => u._id !== deleteDialog.user._id));
    }
    setDeleteDialog({ open: false, user: null });
  };

  // Filter users by search
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  // Paginate filtered users
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  // Column definitions for common DataTable
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
            {row.name.charAt(0)}
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
      render: (role) => <StatusBadge status={role} color="primary" />,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      key: "createdAt",
      label: "Created Date",
      sortable: true,
      render: (date) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(date).toLocaleDateString()}
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
              onClick={() => handleOpenEdit(row)}
            >
              <Edit2 size={16} />
            </IconButton>
          </RoleGuard>

          <RoleGuard allowedRoles={[ROLES.ADMIN]}>
            <IconButton
              size="small"
              title="Delete User"
              color="error"
              onClick={() => setDeleteDialog({ open: true, user: row })}
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
        {/* Page Header */}
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
              onClick={handleOpenAdd}
            >
              Add New User
            </Button>
          </RoleGuard>
        </Box>

        {/* Filter Search Bar */}
        <Box sx={{ mb: 2.5, width: "100%", maxWidth: { xs: "100%", md: 420 } }}>
          <SearchInput
            placeholder="Search by name or email..."
            value={search}
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to page 1 on search
            }}
          />
        </Box>

        {/* Common DataTable with Sorting & Pagination */}
        <DataTable
          columns={columns}
          data={paginatedUsers}
          loading={loading}
          pagination={{
            page,
            totalPages,
            totalItems,
            rowsPerPage,
            rowsPerPageOptions: [5, 10, 25],
            onPageChange: (newPage) => setPage(newPage),
            onRowsPerPageChange: (newRows) => {
              setRowsPerPage(newRows);
              setPage(1);
            },
          }}
          emptyTitle="No Users Found"
          emptyDescription="Try adjusting your search criteria or add a new user."
        />

        {/* User Modal (Add / Edit) */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingUser ? "Edit User Profile" : "Add New User"}
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
                onClick={handleSaveUser}
              >
                {editingUser ? "Save Updates" : "Create User"}
              </Button>
            </Stack>
          }
        >
          <Stack spacing={2.5}>
            <TextInput
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SelectInput
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: ROLES.ADMIN, label: "Admin (Full Access)" },
                { value: ROLES.MANAGER, label: "Manager" },
                { value: ROLES.USER, label: "User" },
              ]}
            />
            <SelectInput
              label="Account Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: USER_STATUS.ACTIVE, label: "Active" },
                { value: USER_STATUS.INACTIVE, label: "Inactive" },
                { value: USER_STATUS.SUSPENDED, label: "Suspended" },
              ]}
            />
          </Stack>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, user: null })}
          onConfirm={handleDeleteConfirm}
          type="danger"
          title="Delete Account"
          message={`Are you sure you want to delete user "${deleteDialog.user?.name}"?`}
          confirmText="Yes, Delete User"
        />
      </Box>
    </MotionFadeIn>
  );
};

export default UsersPage;

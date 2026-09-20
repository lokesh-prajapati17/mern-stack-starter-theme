import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectUserRole,
  selectAuthLoading,
  selectAuthError,
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
  clearAuthError,
} from "../store/slices/authSlice";
import { ROLES } from "../constants/RbacConstants";

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const isAdmin = useMemo(() => role === ROLES.ADMIN, [role]);
  const isManager = useMemo(() => role === ROLES.MANAGER, [role]);
  const isUser = useMemo(() => role === ROLES.USER, [role]);

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch],
  );

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);

  const refreshProfile = useCallback(
    () => dispatch(fetchCurrentUser()),
    [dispatch],
  );

  const clearError = useCallback(
    () => dispatch(clearAuthError()),
    [dispatch],
  );

  return {
    user,
    token,
    isAuthenticated,
    role,
    loading,
    error,
    isAdmin,
    isManager,
    isUser,
    login,
    register,
    logout,
    refreshProfile,
    clearError,
  };
};

export default useAuth;

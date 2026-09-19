import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/KeyConstants";
import AuthService from "../../services/AuthService";

/**
 * Extract auth data safely from response payload
 */
export const extractAuthData = (payload) => {
  if (!payload) return { user: null, token: null, refreshToken: null };
  const data =
    payload.data && typeof payload.data === "object" ? payload.data : payload;
  const user = data.user || (data.email ? data : null);
  const token = data.token || data.accessToken || payload.token || null;
  const refreshToken = data.refreshToken || payload.refreshToken || null;
  return { user, token, refreshToken };
};

/**
 * Persist tokens and user data strictly to single canonical STORAGE_KEYS
 * Also purges any redundant or legacy keys
 */
export const saveAuthToStorage = ({ user, token, refreshToken }) => {
  if (typeof window === "undefined") return;
  try {
    // Purge redundant / legacy duplicate keys from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("auth_token");

    // Persist only in single canonical keys
    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
    if (user) {
      const userStr = typeof user === "string" ? user : JSON.stringify(user);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, userStr);
    }
  } catch (e) {
    console.warn("Failed to save auth to localStorage:", e);
  }
};

/**
 * Cleanly remove all auth tokens and user data from localStorage
 */
export const clearAuthFromStorage = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);

    // Purge legacy duplicate keys as well
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("auth_token");
  } catch (e) {
    console.warn("Failed to clear auth from localStorage:", e);
  }
};

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return { token: null, user: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const rawUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    let user = null;
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      user = parsed?.user || (parsed?.email ? parsed : null);
    }

    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token),
    };
  } catch (e) {
    return { token: null, user: null, isAuthenticated: false };
  }
};

const initialAuth = getInitialAuthState();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response?.data || response;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      return response?.data || response;
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.getMe();
      return response?.data || response;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch user");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialAuth.user,
    token: initialAuth.token,
    isAuthenticated: initialAuth.isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = extractAuthData(action.payload);
      state.user = user;
      state.token = token;
      state.isAuthenticated = Boolean(token);
      state.error = null;
      saveAuthToStorage({ user, token, refreshToken });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthFromStorage();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token, refreshToken } = extractAuthData(action.payload);
        state.user = user;
        state.token = token;
        state.isAuthenticated = Boolean(token);
        saveAuthToStorage({ user, token, refreshToken });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token, refreshToken } = extractAuthData(action.payload);
        state.user = user;
        state.token = token;
        state.isAuthenticated = Boolean(token);
        saveAuthToStorage({ user, token, refreshToken });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch me
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const user =
          action.payload?.user || action.payload?.data || action.payload;
        state.user = user;
        try {
          if (user) {
            const userStr = JSON.stringify(user);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, userStr);
          }
        } catch (e) {}
      });
  },
});

export const { setCredentials, logout, clearAuthError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

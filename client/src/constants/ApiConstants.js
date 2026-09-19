/**
 * API Endpoints & Base URL Configuration
 */
export const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5005/api";

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_ME: "/auth/me",
  AUTH_LOGOUT: "/auth/logout",

  // Users
  USERS: "/users",
  USER_BY_ID: (id) => `/users/${id}`,

  // Health
  HEALTH: "/health",
};

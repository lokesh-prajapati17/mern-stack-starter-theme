import axios from "axios";
import { BASE_API_URL } from "../constants/ApiConstants";
import {
  STORAGE_KEYS,
  HEADER_KEYS,
  HTTP_STATUS,
} from "../constants/KeyConstants";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: {
    [HEADER_KEYS.CONTENT_TYPE]: HEADER_KEYS.APPLICATION_JSON,
    [HEADER_KEYS.ACCEPT]: HEADER_KEYS.APPLICATION_JSON,
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const getStorage = () =>
  typeof window !== "undefined"
    ? window.localStorage
    : typeof localStorage !== "undefined"
      ? localStorage
      : null;

export const clearAuthStorage = () => {
  try {
    const storage = getStorage();
    if (storage) {
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      storage.removeItem("token");
      storage.removeItem("accessToken");
      storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      storage.removeItem("refreshToken");
      storage.removeItem(STORAGE_KEYS.USER_DATA);
      storage.removeItem("user");
      storage.removeItem("userData");
    }
  } catch (e) {
    console.warn("Could not clear auth storage:", e);
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const storage = getStorage();
      const token = storage ? storage.getItem(STORAGE_KEYS.AUTH_TOKEN) : null;
      if (token && !config.headers[HEADER_KEYS.AUTHORIZATION]) {
        config.headers[HEADER_KEYS.AUTHORIZATION] =
          `${HEADER_KEYS.BEARER} ${token}`;
      }
    } catch (err) {
      console.warn("Could not read auth token from storage:", err);
    }

    if (config.data instanceof FormData) {
      delete config.headers[HEADER_KEYS.CONTENT_TYPE];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      const storage = getStorage();
      const refreshToken = storage
        ? storage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
        : null;

      if (refreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers[HEADER_KEYS.AUTHORIZATION] =
                `${HEADER_KEYS.BEARER} ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshUrl = `${BASE_API_URL}/auth/refresh`;
          const response = await axios.post(refreshUrl, { refreshToken });

          const newAccessToken =
            response.data?.token ||
            response.data?.accessToken ||
            response.data?.data?.token;
          const newRefreshToken =
            response.data?.refreshToken || response.data?.data?.refreshToken;

          if (newAccessToken) {
            if (storage) {
              storage.setItem(STORAGE_KEYS.AUTH_TOKEN, newAccessToken);
              if (newRefreshToken) {
                storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
              }
            }

            axiosInstance.defaults.headers.common[HEADER_KEYS.AUTHORIZATION] =
              `${HEADER_KEYS.BEARER} ${newAccessToken}`;
            processQueue(null, newAccessToken);

            originalRequest.headers[HEADER_KEYS.AUTHORIZATION] =
              `${HEADER_KEYS.BEARER} ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } else {
            throw new Error("No access token returned by refresh service");
          }
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          clearAuthStorage();
          return Promise.reject({
            success: false,
            message: "Session expired. Please log in again.",
            status: HTTP_STATUS.UNAUTHORIZED,
            data: null,
            originalError: refreshErr,
          });
        } finally {
          isRefreshing = false;
        }
      } else {
        clearAuthStorage();
      }
    }

    const errorResponse = {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
      originalError: error,
    };

    if (error.response?.data?.message) {
      errorResponse.message = error.response.data.message;
    } else if (
      error.code === "ECONNABORTED" ||
      error.message?.includes("timeout")
    ) {
      errorResponse.message = "Request timed out. Please try again.";
    } else if (error.request) {
      errorResponse.message =
        "Unable to connect to server. Check your network or API status.";
    }

    return Promise.reject(errorResponse);
  },
);

export default axiosInstance;

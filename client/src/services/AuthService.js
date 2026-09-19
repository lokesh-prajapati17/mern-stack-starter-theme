import axiosInstance from "./AxiosService";
import { API_ENDPOINTS } from "../constants/ApiConstants";

export const AuthService = {
  login: (credentials) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
  },

  register: (userData) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH_REGISTER, userData);
  },

  refreshToken: (refreshToken) => {
    return axiosInstance.post(API_ENDPOINTS.AUTH_REFRESH, { refreshToken });
  },

  getMe: () => {
    return axiosInstance.get(API_ENDPOINTS.AUTH_ME);
  },

  logout: () => {
    return axiosInstance.post(API_ENDPOINTS.AUTH_LOGOUT);
  },
};

export default AuthService;

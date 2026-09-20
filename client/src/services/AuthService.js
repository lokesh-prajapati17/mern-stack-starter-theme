import ApiServices from "./ApiServices";
import { API_ENDPOINTS } from "../constants/ApiConstants";

export const AuthService = {
  login: (credentials) => {
    return ApiServices.callPostService(API_ENDPOINTS.AUTH_LOGIN, credentials);
  },

  register: (userData) => {
    return ApiServices.callPostService(API_ENDPOINTS.AUTH_REGISTER, userData);
  },

  refreshToken: (refreshToken) => {
    return ApiServices.callPostService(API_ENDPOINTS.AUTH_REFRESH, {
      refreshToken,
    });
  },

  getMe: () => {
    return ApiServices.callGetService(API_ENDPOINTS.AUTH_ME);
  },

  updateProfile: (profileData) => {
    return ApiServices.callPutService(API_ENDPOINTS.AUTH_PROFILE, profileData);
  },

  changePassword: (passwordData) => {
    return ApiServices.callPutService(
      API_ENDPOINTS.AUTH_CHANGE_PASSWORD,
      passwordData,
    );
  },

  logout: () => {
    return ApiServices.callPostService(API_ENDPOINTS.AUTH_LOGOUT);
  },
};

export default AuthService;

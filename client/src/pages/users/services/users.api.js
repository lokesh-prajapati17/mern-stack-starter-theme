import { showToast } from "../../../contexts/ToastContext";
import ApiServices from "../../../services/ApiServices";
import { USER_ENDPOINTS } from "./users.urlHelper";

export const getUsersApi = async (params = {}) => {
  try {
    const result = await ApiServices.callGetService(
      USER_ENDPOINTS.GET_ALL,
      params,
    );
    if (result?.success) {
      return result?.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const getUserByIdApi = async (id) => {
  try {
    const result = await ApiServices.callGetService(
      USER_ENDPOINTS.GET_BY_ID(id),
    );
    if (result?.success) {
      return result?.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const createUserApi = async (userData) => {
  try {
    const result = await ApiServices.callPostService(
      USER_ENDPOINTS.CREATE,
      userData,
    );
    if (result?.success) {
      showToast(result.message || "User created successfully", "success");
      return result?.data;
    } else {
      showToast(result?.message || "Failed to create user", "error");
      return null;
    }
  } catch (err) {
    showToast(err?.message || "Failed to create user", "error");
    return null;
  }
};

export const updateUserApi = async (id, userData) => {
  try {
    const result = await ApiServices.callPutService(
      USER_ENDPOINTS.UPDATE(id),
      userData,
    );
    if (result?.success) {
      showToast(result.message || "User updated successfully", "success");
      return result?.data;
    } else {
      showToast(result?.message || "Failed to update user", "error");
      return null;
    }
  } catch (err) {
    showToast(err?.message || "Failed to update user", "error");
    return null;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const result = await ApiServices.callDeleteService(
      USER_ENDPOINTS.DELETE(id),
    );
    if (result?.success) {
      showToast(result.message || "User deleted successfully", "success");
      return result?.data || true;
    } else {
      showToast(result?.message || "Failed to delete user", "error");
      return null;
    }
  } catch (err) {
    showToast(err?.message || "Failed to delete user", "error");
    return null;
  }
};

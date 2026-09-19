import createBaseService from "./BaseService";
import { API_ENDPOINTS } from "../constants/ApiConstants";

const baseUserService = createBaseService(API_ENDPOINTS.USERS);

export const UserService = {
  ...baseUserService,
  getUsers: (params = {}) => baseUserService.getAll(params),
  getUserById: (id) => baseUserService.getById(id),
  updateUser: (id, data) => baseUserService.update(id, data),
  deleteUser: (id) => baseUserService.delete(id),
};

export default UserService;

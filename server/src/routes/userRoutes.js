import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyAuth } from "../middleware/auth.js";
import { checkRole } from "../middleware/rbac.js";
import { ROLES } from "../constants/roles.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// All user routes require authentication
router.use(verifyAuth);

// Admin & Manager can view user directory
router.get("/", checkRole(ROLES.ADMIN, ROLES.MANAGER), asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));

// User update
router.put("/:id", asyncHandler(updateUser));

// Admin only can delete users
router.delete("/:id", checkRole(ROLES.ADMIN), asyncHandler(deleteUser));

export default router;

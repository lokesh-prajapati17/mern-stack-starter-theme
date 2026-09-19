import express from "express";
import {
  register,
  login,
  refreshToken,
  getMe,
  logout,
} from "../controllers/authController.js";
import { verifyAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post(
  "/register",
  validateBody(["name", "email", "password"]),
  asyncHandler(register),
);
router.post("/login", validateBody(["email", "password"]), asyncHandler(login));
router.post(
  "/refresh",
  validateBody(["refreshToken"]),
  asyncHandler(refreshToken),
);
router.get("/me", verifyAuth, asyncHandler(getMe));
router.post("/logout", asyncHandler(logout));

export default router;

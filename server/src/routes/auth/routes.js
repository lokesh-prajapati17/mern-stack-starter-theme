const express = require("express");
const {
  register,
  login,
  refreshToken,
  getMe,
  updateProfile,
  changePassword,
  logout,
} = require("./controller");
const { verifyAuth } = require("../../middleware/auth");
const { validateBody } = require("../../middleware/validator");
const { asyncHandler } = require("../../utils/asyncHandler");

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
router.put(
  "/profile",
  verifyAuth,
  validateBody(["name"]),
  asyncHandler(updateProfile),
);
router.put(
  "/change-password",
  verifyAuth,
  validateBody(["currentPassword", "newPassword"]),
  asyncHandler(changePassword),
);
router.post("/logout", asyncHandler(logout));

module.exports = router;

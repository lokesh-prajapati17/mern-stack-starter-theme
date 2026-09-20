const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./controller");
const { verifyAuth } = require("../../middleware/auth");
const { checkRole } = require("../../middleware/rbac");
const { ROLES } = require("../../constants/roles");
const { asyncHandler } = require("../../utils/asyncHandler");

const router = express.Router();

router.use(verifyAuth);

router.get("/", checkRole(ROLES.ADMIN, ROLES.MANAGER), asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", checkRole(ROLES.ADMIN), asyncHandler(deleteUser));

module.exports = router;

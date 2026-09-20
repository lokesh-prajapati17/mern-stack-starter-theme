const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
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
router.post(
  "/",
  checkRole(ROLES.ADMIN, ROLES.MANAGER),
  asyncHandler(createUser),
);
router.get(
  "/:id",
  checkRole(ROLES.ADMIN, ROLES.MANAGER),
  asyncHandler(getUserById),
);
router.put(
  "/:id",
  checkRole(ROLES.ADMIN, ROLES.MANAGER),
  asyncHandler(updateUser),
);
router.delete("/:id", checkRole(ROLES.ADMIN), asyncHandler(deleteUser));

module.exports = router;

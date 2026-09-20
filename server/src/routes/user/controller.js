const User = require("./model");
const { sendSuccess, sendError } = require("../../utils/apiResponse");
const { HTTP_STATUS } = require("../../constants/httpStatus");

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return sendSuccess(res, {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }
  return sendSuccess(res, user);
};

const updateUser = async (req, res) => {
  const { name, role, status, avatar } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  if (req.user.role !== "Admin" && (role || status)) {
    return sendError(
      res,
      "Not authorized to change user role or status",
      HTTP_STATUS.FORBIDDEN,
    );
  }

  if (name) user.name = name;
  if (role) user.role = role;
  if (status) user.status = status;
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  return sendSuccess(res, user, "User updated successfully");
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  if (user._id.toString() === req.user.id) {
    return sendError(
      res,
      "Cannot delete your own admin account",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  await user.deleteOne();

  return sendSuccess(res, null, "User deleted successfully");
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

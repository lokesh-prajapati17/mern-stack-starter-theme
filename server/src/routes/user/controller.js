const User = require("./model");
const { sendSuccess, sendError } = require("../../utils/apiResponse");
const { HTTP_STATUS } = require("../../constants/httpStatus");

const getUsers = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  const skip = (page - 1) * limit;
  const search = req.query.search?.trim();

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

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

const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (req.user.role !== "Admin" && role && role !== "User") {
    return sendError(
      res,
      "Only Admins can assign privileged roles",
      HTTP_STATUS.FORBIDDEN,
    );
  }

  const existingUser = await User.findOne({ email: email?.toLowerCase() });
  if (existingUser) {
    return sendError(
      res,
      "A user with this email address already exists",
      HTTP_STATUS.CONFLICT,
    );
  }

  const user = await User.create({
    ...req.body,
    password: password || "User123!",
  });

  return sendSuccess(
    res,
    user,
    "User created successfully",
    HTTP_STATUS.CREATED,
  );
};

const updateUser = async (req, res) => {
  const { role, status, email } = req.body;

  if (req.user.role !== "Admin" && (role || status)) {
    return sendError(
      res,
      "Not authorized to change user role or status",
      HTTP_STATUS.FORBIDDEN,
    );
  }

  if (email) {
    const emailConflict = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.params.id },
    });
    if (emailConflict) {
      return sendError(
        res,
        "Email address is already in use by another account",
        HTTP_STATUS.CONFLICT,
      );
    }
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, user, "User updated successfully");
};

const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    return sendError(
      res,
      "Cannot delete your own admin account",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, null, "User deleted successfully");
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

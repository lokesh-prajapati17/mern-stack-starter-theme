const User = require("./model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwtUtils");
const { sendSuccess, sendError } = require("../../utils/apiResponse");
const { HTTP_STATUS } = require("../../constants/httpStatus");
const { ROLES } = require("../../constants/roles");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return sendError(
      res,
      "User already exists with this email address",
      HTTP_STATUS.CONFLICT,
    );
  }

  const assignedRole =
    role && Object.values(ROLES).includes(role) ? role : ROLES.USER;

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: assignedRole,
  });

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ id: user._id });

  return sendSuccess(
    res,
    {
      user,
      token: accessToken,
      refreshToken,
    },
    "Registration successful",
    HTTP_STATUS.CREATED,
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if (!user || !(await user.matchPassword(password))) {
    return sendError(
      res,
      "Invalid email or password credentials",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  if (user.status !== "Active") {
    return sendError(
      res,
      `Account is ${user.status.toLowerCase()}. Please contact support.`,
      HTTP_STATUS.FORBIDDEN,
    );
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ id: user._id });

  return sendSuccess(
    res,
    {
      user,
      token: accessToken,
      refreshToken,
    },
    "Login successful",
  );
};

const refreshToken = async (req, res) => {
  const { refreshToken: incomingToken } = req.body;

  if (!incomingToken) {
    return sendError(res, "Refresh token is required", HTTP_STATUS.BAD_REQUEST);
  }

  try {
    const decoded = verifyRefreshToken(incomingToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, "User no longer exists", HTTP_STATUS.UNAUTHORIZED);
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken({ id: user._id });

    return sendSuccess(
      res,
      {
        token: newAccessToken,
        refreshToken: newRefreshToken,
      },
      "Token refreshed successfully",
    );
  } catch (err) {
    return sendError(
      res,
      "Invalid or expired refresh token",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }
  return sendSuccess(res, user, "Profile fetched successfully");
};

const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  if (name) user.name = name.trim();
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();
  return sendSuccess(res, user, "Profile updated successfully");
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendError(
      res,
      "Current password and new password are required",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (newPassword.length < 6) {
    return sendError(
      res,
      "New password must be at least 6 characters long",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return sendError(
      res,
      "Current password is incorrect",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  user.password = newPassword;
  await user.save();

  return sendSuccess(res, null, "Password changed successfully");
};

const logout = async (req, res) => {
  return sendSuccess(res, null, "Logged out successfully");
};

module.exports = {
  register,
  login,
  refreshToken,
  getMe,
  updateProfile,
  changePassword,
  logout,
};

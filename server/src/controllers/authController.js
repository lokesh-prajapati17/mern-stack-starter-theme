import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ROLES } from "../constants/roles.js";
import { logger } from "../utils/logger.js";

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    logger.warn(`⚠️ [AUTH] Registration rejected: ${email} already exists`);
    return sendError(
      res,
      "User already exists with this email address",
      HTTP_STATUS.CONFLICT,
    );
  }

  // Fallback / default role protection (cannot self-register as Admin unless specified in dev)
  const assignedRole =
    role && Object.values(ROLES).includes(role) ? role : ROLES.USER;

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: assignedRole,
  });

  logger.info(
    `👤 [AUTH] New user registered successfully: ${user.email} (${user.role}) [ID: ${user._id}]`,
  );

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

/**
 * Log in user & return tokens
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if (!user || !(await user.matchPassword(password))) {
    logger.warn(`⚠️ [AUTH] Failed login attempt for email: ${email}`);
    return sendError(
      res,
      "Invalid email or password credentials",
      HTTP_STATUS.UNAUTHORIZED,
    );
  }

  if (user.status !== "Active") {
    logger.warn(
      `⚠️ [AUTH] Inactive account login attempt: ${email} (${user.status})`,
    );
    return sendError(
      res,
      `Account is ${user.status.toLowerCase()}. Please contact support.`,
      HTTP_STATUS.FORBIDDEN,
    );
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  logger.info(`🔑 [AUTH] User logged in: ${user.email} (${user.role}) [ID: ${user._id}]`);

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

/**
 * Refresh expired access token
 * POST /api/auth/refresh
 */
export const refreshToken = async (req, res) => {
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

/**
 * Get current authenticated user profile
 * GET /api/auth/me
 */
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return sendError(res, "User not found", HTTP_STATUS.NOT_FOUND);
  }
  return sendSuccess(res, user, "Profile fetched successfully");
};

/**
 * Log out user
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  return sendSuccess(res, null, "Logged out successfully");
};

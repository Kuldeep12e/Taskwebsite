const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

function sendBadRequest(res, message) {
  return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message });
}

function validateCreateTask(req, res, next) {
  const { title, userId, status } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return sendBadRequest(res, "Title is required and must be a non-empty string");
  }

  // If the request is authenticated, userId can be taken from req.user; only validate body.userId when not authenticated
  if (!req.user) {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return sendBadRequest(res, "A valid userId is required");
    }
  }

  if (status && !["pending", "in-progress", "completed"].includes(status)) {
    return sendBadRequest(res, "Status must be one of: pending, in-progress, completed");
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, status, userId } = req.body;

  
  if (
    title === undefined &&
    description === undefined &&
    status === undefined &&
    userId === undefined
  ) {
    return sendBadRequest(res, "At least one field (title, description, status, userId) is required to update");
  }

  if (status && !["pending", "in-progress", "completed"].includes(status)) {
    return sendBadRequest(res, "Status must be one of: pending, in-progress, completed");
  }

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return sendBadRequest(res, "userId must be a valid ObjectId");
  }

  next();
}

function validateTaskIdParam(req, res, next) {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return sendBadRequest(res, "Invalid task id");
  }
  next();
}

function validateUserIdParam(req, res, next) {
  const { userId } = req.params;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return sendBadRequest(res, "Invalid user id");
  }
  next();
}

// User validations
function isValidEmail(email) {
  // simple regex for basic email validation
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCreateUser(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return sendBadRequest(res, "Name is required and must be a non-empty string");
  }

  if (!email || !isValidEmail(email)) {
    return sendBadRequest(res, "A valid email is required");
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return sendBadRequest(res, "Password is required and must be at least 6 characters long");
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    return sendBadRequest(res, "A valid email is required");
  }

  if (!password || typeof password !== "string" || password.length === 0) {
    return sendBadRequest(res, "Password is required");
  }

  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskIdParam,
  validateUserIdParam,
  validateCreateUser,
  validateLogin,
};

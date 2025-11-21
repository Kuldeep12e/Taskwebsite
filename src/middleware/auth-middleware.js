const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const AUTH = require("../utils/common/auth");

async function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });

  const payload = AUTH.verifyToken(token);
  if (!payload)
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });

  req.user = payload;
  next();
}

module.exports = protect;

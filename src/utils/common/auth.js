const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = process.env.JWT_SECRET || "secret_key";

function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function checkPassword(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  checkPassword
};

const {UserRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const AUTH = require("../utils/common/auth");

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const res = await userRepository.findByEmail(data.email);
    
    if (res) {
      throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
    }

    
    const hashedPassword = await AUTH.hashPassword(data.password);
    
  
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "user"
    });

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Cannot create user", StatusCodes.BAD_REQUEST);
  }
}

async function signIn(data) {
  try {

    
    const user = await userRepository.findByEmail(data.email);
    

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    const passwordMatch = await AUTH.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect password", StatusCodes.BAD_REQUEST);
    }

    const token = AUTH.createToken({ id: user._id, email: user.email, role: user.role });

    return { user, token };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError("Login failed", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function isAuthenticated(token) {
  const payload = AUTH.verifyToken(token);
  if (!payload) {
    throw new AppError("Invalid token", StatusCodes.BAD_REQUEST);
  }

  const user = await userRepository.get(payload.id);
  return user;
}



module.exports = {
  createUser,
  signIn,
  isAuthenticated
};

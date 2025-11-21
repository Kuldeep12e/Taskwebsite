const {userService}= require("../services");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
}

async function login(req, res) {
  try {

    
    const { user, token } = await userService.signIn(req.body);
    
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
     
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
}

async function isAuthenticated(req, res) {
  try {
    const tokenFromCookie = req.cookies && req.cookies.token;
    const authHeader = req.headers && req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "No token provided" });
    }

    const user = await userService.isAuthenticated(token);
    return res.status(StatusCodes.OK).json({ success: true, user });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
}

module.exports = {
  register,
  login,
  isAuthenticated
  , logout: (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return res.status(200).json({ success: true, message: 'Logged out' });
  }
};

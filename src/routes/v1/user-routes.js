const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");
const { validateCreateUser, validateLogin } = require("../../middleware/validation-middleware");

router.post("/signup", validateCreateUser, UserController.register);
router.post("/signin", validateLogin, UserController.login);

router.post("/logout", UserController.logout);
router.get("/me", UserController.isAuthenticated);

module.exports = router;

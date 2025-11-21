const express = require("express");
const router = express.Router();
const userRoutes = require("./v1/user-routes");
const taskRoutes = require("./v1/task-routes");

router.use("/v1/users", userRoutes);
router.use("/v1/tasks", taskRoutes);

module.exports = router;
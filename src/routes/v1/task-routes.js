const express = require("express");
const router = express.Router();


const { TaskController } = require("../../controllers");
const { AuthMidleware } = require("../../middleware");
const {
	validateCreateTask,
	validateUpdateTask,
	validateTaskIdParam,
	validateUserIdParam,
} = require("../../middleware/validation-middleware");



router.post("/", AuthMidleware, validateCreateTask, TaskController.createTask);

// Get tasks for authenticated user
router.get("/me", AuthMidleware, TaskController.getMyTasks);

// Get tasks for a specific user (admin or the user themselves)
router.get("/user/:userId", AuthMidleware, validateUserIdParam, TaskController.getTasksByUser);

router.get("/:id", validateTaskIdParam, TaskController.getTask);


router.put("/:id", validateTaskIdParam, AuthMidleware, validateUpdateTask, TaskController.updateTask);

router.delete("/:id", validateTaskIdParam, AuthMidleware, TaskController.deleteTask);

module.exports = router;
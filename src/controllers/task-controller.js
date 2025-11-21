const { TaskService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function createTask(req, res) {
	try {
		
		const userId = (req.user && (req.user.id || req.user._id)) || req.body.userId;
		const payload = { ...req.body, userId };

		const task = await TaskService.createTask(payload);
		return res.status(StatusCodes.CREATED).json({ success: true, task });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}

async function getTask(req, res) {
	try {
		const task = await TaskService.getTask(req.params.id);
		return res.status(StatusCodes.OK).json({ success: true, task });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}



async function getTasksByUser(req, res) {
	try {
		const userId = req.params.userId || req.body.userId || (req.user && (req.user.id || req.user._id));

		
		const requesterId = req.user && (req.user.id || req.user._id);
		const requesterRole = req.user && req.user.role;
		if (!requesterId) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
		}

		if (String(requesterId) !== String(userId) && requesterRole !== 'admin') {
			return res.status(StatusCodes.FORBIDDEN).json({ success: false, message: 'Forbidden: cannot access other user tasks' });
		}

		const tasks = await TaskService.getTasksByUser(userId);
		return res.status(StatusCodes.OK).json({ success: true, tasks });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}

async function getMyTasks(req, res) {
	try {
		const userId = req.user && (req.user.id || req.user._id);
		if (!userId) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
		}

		const tasks = await TaskService.getTasksByUser(userId);
		return res.status(StatusCodes.OK).json({ success: true, tasks });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}

async function updateTask(req, res) {
	try {
		const task = await TaskService.updateTask(req.params.id, req.body);
		return res.status(StatusCodes.OK).json({ success: true, task });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}

async function deleteTask(req, res) {
	try {
		const task = await TaskService.deleteTask(req.params.id);
		return res.status(StatusCodes.OK).json({ success: true, task });
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
}

module.exports = {
	createTask,
	getTask,
	getTasksByUser,
	getMyTasks,
	updateTask,
	deleteTask,
};


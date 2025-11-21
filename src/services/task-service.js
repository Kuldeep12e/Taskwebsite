const { TaskRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const taskRepository = new TaskRepository();


async function createTask(data) {
  try {
    const task = await taskRepository.create(data);
    return task;
  } catch (error) {
    if (error.name === "ValidationError") {
      const explanation = Object.values(error.errors).map((e) => e.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create task",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function getTask(id) {
  try {
    const task = await taskRepository.get(id);
    return task;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      "Cannot fetch task",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}



async function getTasksByUser(userId) {
  try {
    const tasks = await taskRepository.getTasksByUser(userId);
    return tasks;
  } catch (error) {
    throw new AppError(
      "Cannot fetch user's tasks",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function updateTask(id, data) {
  try {
    const task = await taskRepository.update(id, data);
    return task;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      "Cannot update task",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function deleteTask(id) {
  try {
    const task = await taskRepository.destroy(id);
    return task;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      "Cannot delete task",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createTask,
  getTask,
  getTasksByUser,
  updateTask,
  deleteTask,
};

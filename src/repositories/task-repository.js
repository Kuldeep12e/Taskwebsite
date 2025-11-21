const CrudRepository = require("./crud-repository");
const { Task } = require("../models");

class TaskRepository extends CrudRepository {
  constructor() {
    super(Task);
  }

  async getTasksByUser(userId) {
    try {
      const tasks = await this.model.find({ userId });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

 
}

module.exports = TaskRepository;

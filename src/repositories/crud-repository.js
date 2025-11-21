const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }


  async create(data) {
    try {
      console.log("Creating data:", data); 
      const response = await this.model.create(data);
      
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError("Failed to create resource", StatusCodes.BAD_REQUEST);
    }
  }

  
  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new AppError(
        "The requested resource is not found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  
  async getAll(filter = {}) {
    const response = await this.model.find(filter);
    return response;
  }

  
  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true, 
    });

    if (!response) {
      throw new AppError(
        "The requested resource is not found",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  }


  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);

    if (!response) {
      throw new AppError(
        "The requested resource is not found",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

   async getTasksByUser(userId) {
    return await this.model.find({ userId });
  }
}

module.exports = CrudRepository;

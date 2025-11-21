const CrudRepository = require("./crud-repository");
const {User} = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email) {
    try {
      const user = await this.model.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UserRepository;

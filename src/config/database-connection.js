const mongoose = require("mongoose");

// Export an object with a `connect` method so callers can use `Db.connect(...)`.
const connect = async (mongoUrl) => {
  try {
    // Use the provided mongoUrl when connecting
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connect };
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log("Database name:", mongoose.connection.name);

  } catch (err) {
    console.error("❌ Database connection failed!");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
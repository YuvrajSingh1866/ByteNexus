const mongoose = require("mongoose");

const connectDB = async () => {
  // maan gandu
 
  console.log("Attempting to connect to MongoDB...");

  try {
    // Use local MongoDB (what you already have running)
    await mongoose.connect("mongodb://127.0.0.1:27017/bytenexus");
    console.log("✅ MongoDB Connected Successfully!");
    console.log("Database name:", mongoose.connection.name);
  } catch (err) {
    console.error("❌❌❌ Connection Failed! ❌❌❌");
    console.error("Error message:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
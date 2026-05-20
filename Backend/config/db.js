const mongoose = require("mongoose");

const connectDB = async () => {

  console.log("Attempting to connect to MongoDB...");

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log(
      "Database name:",
      mongoose.connection.name
    );

  } catch (err) {

    console.error("❌❌❌ Connection Failed! ❌❌❌");
    console.error("Error message:", err.message);

    process.exit(1);

  }

};

module.exports = connectDB;
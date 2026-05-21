const mongoose = require("mongoose");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log(
      "Database name:",
      mongoose.connection.name
    );

    console.log("Attempting to connect to database via Prisma...");

    await prisma.$connect();

    console.log("✅ Prisma connected successfully!");

  } catch (err) {
    console.error("❌ Database connection failed!");
    console.error("Error message:", err.message);

    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
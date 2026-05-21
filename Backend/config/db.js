const mongoose = require("mongoose");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
<<<<<<< HEAD
  console.log("Attempting to connect to database via Prisma...");
  try {
=======
  console.log("Attempting to connect to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully!");
    console.log(
      "Database name:",
      mongoose.connection.name
    );

    console.log("Attempting to connect to database via Prisma...");

>>>>>>> cf579ca867eca2c02901b2b38a502de99b1a130b
    await prisma.$connect();

    console.log("✅ Prisma connected successfully!");

  } catch (err) {
<<<<<<< HEAD
    console.error("❌ Prisma connection failed!");
=======
    console.error("❌ Database connection failed!");
>>>>>>> cf579ca867eca2c02901b2b38a502de99b1a130b
    console.error("Error message:", err.message);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
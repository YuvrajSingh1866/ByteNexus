const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to database...");
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, prisma };
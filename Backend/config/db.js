const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  console.log("Attempting to connect to database via Prisma...");
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully!");
  } catch (err) {
    console.error("❌ Prisma connection failed!");
    console.error("Error message:", err.message);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
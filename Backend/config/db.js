const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
<<<<<<< HEAD

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
=======
  console.log("Attempting to connect to database via Prisma...");
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully!");
  } catch (err) {
    console.error("❌ Prisma connection failed!");
>>>>>>> e8bdc5a (comment add)
    console.error("Error message:", err.message);

    process.exit(1);

  }

};

module.exports = { prisma, connectDB };
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStoreRaw = require("connect-mongo");
const MongoStore = MongoStoreRaw.default || MongoStoreRaw;

const subjectRoutes = require("./routes/subjects");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes"); // 👈 NEW

const connectDB = require("./config/db");

const app = express();

// DB connection
connectDB();

// middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5174"],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "default_super_secret_key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bytenexus"
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }
}));

// routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes); // 👈 NEW ROUTE ADDED

// base route
app.get("/", (req, res) => {
  res.send("ByteNexus Backend Running 🚀");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
require("dotenv").config(); // 👈 add this

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const subjectRoutes = require("./routes/subjects");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();

// DB connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/users", userRoutes);

// base route
app.get("/", (req,res)=>{
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

app.listen(PORT, ()=>{
 console.log(`🚀 Server running on http://localhost:${PORT}`);
});
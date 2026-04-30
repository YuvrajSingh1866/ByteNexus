require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStoreRaw = require("connect-mongo");
const MongoStore = MongoStoreRaw.default || MongoStoreRaw;
const protect = require("./middleware/auth");
const subjectRoutes = require("./routes/subjects");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes"); // 👈 NEW

const connectDB = require("./config/db");

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// DB connection
connectDB();

// middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
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
app.use("/api/rooms", protect, roomRoutes);

// base route
app.get("/", (req, res) => {
  res.send("ByteNexus Backend Running 🚀");
});

// about page route
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const aiModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

const SYSTEM_PROMPT = `
You are ByteBot, the official AI assistant for ByteNexus.
ByteNexus is an educational platform with real-time collaboration, a playground for coding, courses, and study materials.
You must guide users on how to use the frontend and backend of this website, and help them understand coding concepts.
Be helpful, concise, and friendly.
`;

io.on("connection", (socket) => {
  console.log("User connected to Chatbot:", socket.id);

  socket.on("chat_message", async (msg) => {
    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key") {
        socket.emit("bot_response", "Please set GEMINI_API_KEY in the backend .env file to enable the AI Chatbot.");
        return;
      }
      const prompt = `${SYSTEM_PROMPT}\nUser: ${msg}\nByteBot:`;
      const result = await aiModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      socket.emit("bot_response", text);
    } catch (error) {
      console.error("AI Error:", error);
      socket.emit("bot_response", "Oops, I encountered an error while thinking. Try again later!");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from Chatbot:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
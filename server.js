require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const protect = require("./middleware/auth");
const subjectRoutes = require("./routes/subjects");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

const connectDB = require("./config/db");
const questions = require("./controllers/questions");

const app = express();
const server = http.createServer(app);

connectDB();

// ==========================================
// VIEW ENGINE
// ==========================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());


// ==========================================
// CORS
// ==========================================
// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://byte-nexus-psi.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {

        console.log("CORS request from:", origin);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("❌ CORS blocked:", origin);
            callback(new Error("Not allowed by CORS"));
        }

    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ==========================================
// TRUST PROXY
// Required for Render HTTPS cookies
// ==========================================

app.set("trust proxy", 1);


// ==========================================
// SESSION
// ==========================================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "development-secret",

        resave: false,

        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),

        cookie: {
            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",

            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


// ==========================================
// ROUTES
// ==========================================

app.use("/api/subjects", subjectRoutes);

app.use("/api/users", userRoutes);

app.use("/api/rooms", roomRoutes);


// ==========================================
// QUESTIONS
// ==========================================

app.get("/api/questions", (req, res) => {

    const { topic, difficulty } = req.query;

    const filtered = questions.find(
        q =>
            q.topic == topic &&
            q.difficulty == difficulty
    );

    if (filtered) {
        res.json(filtered);
    } else {
        res.status(404).json({
            message:
                "No question found for the given topic and difficulty"
        });
    }
});


// ==========================================
// BASE ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("ByteNexus Backend Running 🚀");
});


// ==========================================
// ABOUT
// ==========================================

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us"
    });
});


// ==========================================
// 404
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong"
    });
});


// ==========================================
// SOCKET.IO
// ==========================================

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://byte-nexus-psi.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});


// ==========================================
// GEMINI AI
// ==========================================

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || "dummy_key"
);

const aiModel = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
});


const SYSTEM_PROMPT = `
You are ByteBot, the official AI assistant for ByteNexus.

ByteNexus is an educational platform with:
- Real-time collaboration
- Coding playground
- Courses
- Study materials
- Coding challenges
- Community features

You must guide users on how to use the ByteNexus website
and help them understand coding concepts.

Be helpful, concise, and friendly.
`;


// ==========================================
// SOCKET CONNECTION
// ==========================================

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);


    // ======================================
    // CHATBOT
    // ======================================

    socket.on("chat_message", async (msg) => {

        try {

            if (
                !process.env.GEMINI_API_KEY ||
                process.env.GEMINI_API_KEY === "dummy_key"
            ) {

                socket.emit(
                    "bot_response",
                    "Please set GEMINI_API_KEY in the backend environment variables to enable the AI Chatbot."
                );

                return;
            }


            const prompt = `
${SYSTEM_PROMPT}

User: ${msg}

ByteBot:
`;


            const result =
                await aiModel.generateContent(prompt);

            const response =
                await result.response;

            const text = response.text();


            socket.emit(
                "bot_response",
                text
            );


        } catch (error) {

            console.error(
                "AI Error:",
                error
            );

            socket.emit(
                "bot_response",
                "Oops, I encountered an error while thinking. Try again later!"
            );
        }
    });


    // ======================================
    // DISCONNECT
    // ======================================

    socket.on("disconnect", () => {

        console.log(
            "User disconnected:",
            socket.id
        );

    });

});


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

if (require.main === module) {

    server.listen(PORT, () => {

        console.log(
            `🚀 ByteNexus Backend running on port ${PORT}`
        );

    });

}


module.exports = {
    app,
    server,
    io
};
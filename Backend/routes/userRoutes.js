const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { ObjectId } = require("bson");
const { prisma } = require("../config/db");

const createUser = async (data) => {
  try {
    return await prisma.user.create({ data });
  } catch (err) {
    if (err.code === "P2031") {
      const id = new ObjectId();
      const now = new Date();

      await prisma.$runCommandRaw({
        insert: "User",
        documents: [{
          _id: id,
          ...data,
          createdAt: { $date: now.toISOString() },
          updatedAt: { $date: now.toISOString() }
        }]
      });

      return {
        id: id.toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: now,
        updatedAt: now
      };
    }
    throw err;
  }
};

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      password: hashedPassword
    });

    // 🔥 Store session
    req.session.userId = user.id;

    res.status(201).json({
      message: "Signup successful 🎉",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 Store session
    req.session.userId = user.id;

    res.status(200).json({
      message: "Login successful 🎉",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
    });

    res.status(200).json({ message: "Logout successful 🎉" });
  });
});


// ================= ME =================
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: { id: true, name: true, email: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
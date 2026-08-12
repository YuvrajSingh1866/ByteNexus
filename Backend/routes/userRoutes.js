const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save session
    req.session.userId = user._id;

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Session save failed",
        });
      }

      res.status(201).json({
        message: "Signup successful 🎉",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Save session
    req.session.userId = user._id;

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Session save failed",
        });
      }

      res.status(200).json({
        message: "Login successful 🎉",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid", {
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful 🎉",
    });
  });
});

// ================= CURRENT USER =================
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// ================= GET PROFILE =================
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// ================= UPDATE PROFILE =================
router.put("/profile", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const {
      name,
      username,
      bio,
      college,
      branch,
      year,
      skills,
      github,
      linkedin,
      portfolio,
      avatar,
      coverImage,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      {
        name,
        username,
        bio,
        college,
        branch,
        year,
        skills,
        github,
        linkedin,
        portfolio,
        avatar,
        coverImage,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully 🎉",
      user: updatedUser,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;
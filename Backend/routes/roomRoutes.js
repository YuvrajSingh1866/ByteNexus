const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Invite = require("../models/Invite");
const sendEmail = require("../services/sendEmail");
const protect = require("../middleware/auth");

// ===============================
// Create Room
// ===============================
router.post("/create", protect, async (req, res) => {
  try {
    const { topic, difficulty, invitedFriends } = req.body;

    const senderId = req.session.userId;

    if (!senderId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    if (!topic || !difficulty) {
      return res.status(400).json({
        message: "Topic and difficulty are required",
      });
    }

    if (!invitedFriends || invitedFriends.length === 0) {
      return res.status(400).json({
        message: "Please invite at least one friend",
      });
    }

    for (const email of invitedFriends) {
      const token = uuidv4();

      await Invite.create({
        email,
        token,
        senderId,
        topic,
        difficulty,
      });

      const link = `${process.env.BACKEND_URL}/api/rooms/accept/${token}`;

      await sendEmail(email, link);
    }

    res.status(200).json({
      success: true,
      message: "Invites sent successfully 🚀",
    });
  } catch (err) {
  console.error("========== CREATE ROOM ERROR ==========");
  console.error(err);
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
}
});

// ===============================
// Accept Invite
// ===============================
router.get("/accept/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(404).send("Invite not found");
    }

    invite.status = "accepted";

    await invite.save();

    res.redirect(`${process.env.FRONTEND_URL}/roomLobby/${token}`);
  } catch (err) {
    console.error(err);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
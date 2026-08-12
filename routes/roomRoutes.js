const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Room = require("../models/Room");
const Invite = require("../models/Invite");
const sendEmail = require("../services/sendEmail");
const protect = require("../middleware/auth");

// ===============================
// Create Room
// ===============================
router.post("/create", protect, async (req, res) => {
console.log("===== CREATE ROOM HIT =====");
console.log(req.body);
  try {
    const { topic, difficulty, invitedFriends } = req.body;

    const senderId = req.session.userId;

    if (!senderId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    if (!topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Topic and difficulty are required",
      });
    }

    if (!invitedFriends || invitedFriends.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please invite at least one friend",
      });
    }

    // Create Room
    const roomId = uuidv4();

    await Room.create({
      roomId,
      host: senderId,

      participants: [
        {
          user: senderId,
          ready: true,
        },
      ],

      settings: {
        language: "Java",
        questions: 1,
        duration: 20,
      },
    });
console.log("✅ Room created");
    // Create invite for every email
    for (const email of invitedFriends) {
      const token = uuidv4();

      await Invite.create({
  email,
  token,
  roomId,
  senderId,
  topic,
  difficulty,
});

console.log("✅ Invite created");
      const link = `${process.env.BACKEND_URL}/api/rooms/accept/${token}`;

      await sendEmail(email, link);
    }

    res.status(200).json({
      success: true,
      roomId,
      message: "Invites sent successfully 🚀",
    });
  } catch (err) {
    console.error("========== CREATE ROOM ERROR ==========");
    console.error(err);

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

    // User must be logged in
    if (!req.session.userId) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?invite=${token}`
      );
    }

    // Find invite
    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(404).send("Invite not found");
    }

    // Find room
    const room = await Room.findOne({ roomId: invite.roomId });

    if (!room) {
      return res.status(404).send("Room not found");
    }

    // Add participant if not already in room
    const alreadyJoined = room.participants.some(
      (participant) =>
        participant.user.toString() === req.session.userId.toString()
    );

    if (!alreadyJoined) {
      room.participants.push({
        user: req.session.userId,
        ready: false,
      });

      await room.save();
    }

    // Update invite
    invite.status = "accepted";
    await invite.save();

    // Go to lobby
    return res.redirect(
      `${process.env.FRONTEND_URL}/roomLobby/${invite.roomId}`
    );
  } catch (err) {
    console.error("========== ACCEPT INVITE ERROR ==========");
    console.error(err);

    res.status(500).send("Server Error");
  }
});

// ===============================
// Get Room Details
// ===============================
router.get("/:roomId", protect, async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId })
      .populate("host", "name email")
.populate("participants.user", "name email")

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (err) {
    console.error("========== GET ROOM ERROR ==========");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
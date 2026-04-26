const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const Invite = require("../models/Invite");
const sendEmail = require("../utils/sendEmail");

// 🔥 CREATE ROOM + SEND INVITES
router.post("/create", async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);

    const { topic, difficulty, invitedFriends } = req.body;

    if (!invitedFriends || invitedFriends.length === 0) {
      return res.status(400).json({ message: "No emails provided" });
    }

    for (let email of invitedFriends) {
      console.log("➡️ Sending to:", email);

      const token = uuidv4();

      await Invite.create({ email, token });

      const link = `http://localhost:5000/api/rooms/accept/${token}`;

      await sendEmail(email, link);
    }

    res.json({ message: "Invites sent 🚀" });

  } catch (err) {
    console.error("🔥 ERROR:", err); // 👈 CRITICAL
    res.status(500).json({ message: err.message });
  }
});
router.get("/accept/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(400).send("Invalid or expired invite ❌");
    }

    // mark as accepted
    invite.status = "accepted";
    await invite.save();

    // 👉 redirect to frontend
    res.redirect(`http://localhost:5000/room/${token}`);

  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
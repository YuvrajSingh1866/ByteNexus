const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { ObjectId } = require("bson");
const { prisma } = require("../config/db");
const sendEmail = require("../services/sendEmail");
const protect = require("../middleware/auth");

const createInvite = async (data) => {
  try {
    return await prisma.invite.create({ data });
  } catch (err) {
    if (err.code === "P2031") {
      const now = new Date();
      const id = new ObjectId();

      await prisma.$runCommandRaw({
        insert: "Invite",
        documents: [{
          _id: id,
          ...data,
          createdAt: { $date: now.toISOString() },
          updatedAt: { $date: now.toISOString() }
        }]
      });

      return {
        id: id.toString(),
        email: data.email,
        token: data.token,
        status: data.status || "pending",
        senderId: data.senderId,
        topic: data.topic,
        difficulty: data.difficulty,
        createdAt: now,
        updatedAt: now
      };
    }
    throw err;
  }
};

const updateInviteStatus = async (token, status) => {
  try {
    return await prisma.invite.update({
      where: { token },
      data: { status }
    });
  } catch (err) {
    if (err.code === "P2031") {
      const now = new Date();
      await prisma.$runCommandRaw({
        update: "Invite",
        updates: [
          {
            q: { token },
            u: {
              $set: {
                status,
                updatedAt: { $date: now.toISOString() }
              }
            }
          }
        ]
      });
      return { token, status, updatedAt: now };
    }
    throw err;
  }
};

// 🔥 CREATE ROOM + SEND INVITES
router.post("/create", protect, async (req, res) => {
  console.log("SESSION DATA:", req.session);
  try {
    const { topic, difficulty, invitedFriends } = req.body;

    const senderId = req.session.userId;

    if (!invitedFriends || invitedFriends.length === 0) {
      return res.status(400).json({ message: "No emails provided" });
    }

    for (let email of invitedFriends) {
      const token = uuidv4();

      await createInvite({
        email,
        token,
        senderId,
        topic,
        difficulty
      });

      const link = `http://localhost:5000/api/rooms/accept/${token}`;
      await sendEmail(email, link);
    }

    res.json({ message: "Invites sent 🚀" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/accept/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await prisma.invite.findUnique({ where: { token } });

    if (!invite) {
      return res.status(400).send("Invalid or expired invite ❌");
    }

    await updateInviteStatus(token, "accepted");

    res.redirect(`http://localhost:5173/roomLobby/${token}`);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
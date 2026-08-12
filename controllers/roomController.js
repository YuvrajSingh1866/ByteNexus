const Room = require("../models/Room");
const { v4: uuidv4 } = require("uuid");


// ================= CREATE ROOM =================
const createRoom = async (req, res) => {

  try {

    const roomId = uuidv4();

    const room = await Room.create({

      roomId,

      createdBy: req.session.userId,

      participants: [
        {
          user: req.session.userId,
          ready: false,
          preferredLanguage: "Java"
        }
      ],

      settings: {
        language: "Java",
        timeLimit: 20,
        topics: ["Arrays", "Trees"],
        difficulty: "Medium"
      }

    });

    res.json({
      success: true,
      roomId: room.roomId
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Room creation failed"
    });

  }

};


// ================= GET ROOM =================
const getRoom = async (req, res) => {

  try {

    const room = await Room.findOne({
      roomId: req.params.roomId
    })

    .populate("participants.user", "name")
    .populate("createdBy", "name");

    if (!room) {

      return res.status(404).json({
        message: "Room not found"
      });

    }

    res.json(room);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ================= JOIN ROOM =================
const joinRoom = async (req, res) => {

  try {

    const room = await Room.findOne({
      roomId: req.params.roomId
    });

    if (!room) {

      return res.status(404).json({
        message: "Room not found"
      });

    }

    const alreadyJoined = room.participants.find(

      (p) =>
      p.user.toString() ===
      req.session.userId

    );

    if (!alreadyJoined) {

      room.participants.push({

        user: req.session.userId,
        ready: false,
        preferredLanguage:
        room.settings.language

      });

      await room.save();

    }

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Join room failed"
    });

  }

};


module.exports = {
  createRoom,
  getRoom,
  joinRoom
};
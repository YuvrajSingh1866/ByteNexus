// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  topic: String,
  difficulty: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // 👈 link to your user model
  }

}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
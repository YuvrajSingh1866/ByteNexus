const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ready: {
    type: Boolean,
    default: false,
  },
});

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      unique: true,
      required: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [participantSchema],

    contestStarted: {
      type: Boolean,
      default: false,
    },

    settings: {
      language: {
        type: String,
        default: "Java",
      },

      questions: {
        type: Number,
        default: 1,
      },

      duration: {
        type: Number,
        default: 20,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
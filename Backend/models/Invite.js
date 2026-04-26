const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  email: String,
  token: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Invite", inviteSchema);
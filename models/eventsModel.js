const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: [true, "A event must have an google Id"],
    },
    email: {
      type: String,
      required: [true, "A event must have an email"],
    },
    status: {
      type: String,
      required: [true, "An event must have an status"],
    },
    summary: {
      type: String,
      required: [true, "An event must have a summary"],
    },
    userEmail: {
      type: String,
      required: [true, "An event must have a userEmail"],
    },
  },
  {
    timestamps: true,
  }
);
const events = mongoose.model("event", eventSchema);

module.exports = events;

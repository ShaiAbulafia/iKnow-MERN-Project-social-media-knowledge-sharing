const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const notificationSchema = new mongoose.Schema({
  userId: DEFAULT_VALIDATION,
  title: DEFAULT_VALIDATION,
  avatarUrl: DEFAULT_VALIDATION,
  avatarAlt: DEFAULT_VALIDATION,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  target: DEFAULT_VALIDATION,
  read: { type: Boolean, default: false },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;

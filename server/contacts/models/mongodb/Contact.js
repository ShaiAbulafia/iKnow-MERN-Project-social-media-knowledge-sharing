const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const contactSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: DEFAULT_VALIDATION,
  text: DEFAULT_VALIDATION,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: { type: Boolean, default: false },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;

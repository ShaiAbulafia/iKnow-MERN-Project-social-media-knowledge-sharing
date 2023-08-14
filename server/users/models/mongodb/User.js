const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const Name = require("./Name");
const securityQa = require("./securityQa");

const schema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  aboutMe: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
  },
  kPoints: {
    type: Number,
    required: true,
    minLength: 1,
    default: 0,
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blockedTill: {
    type: Date,
    default: "",
  },
  securityQa: securityQa,
  follows: [String],
});

const User = mongoose.model("user", schema);

module.exports = User;

const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/MongooseValidators");

const Address = new mongoose.Schema({
  state: {
    ...DEFAULT_VALIDATION,
    minLength: 0,
    default: "",
  },
  country: {
    ...DEFAULT_VALIDATION,
    minLength: 0,
    default: "",
  },
  city: {
    ...DEFAULT_VALIDATION,
    minLength: 0,
    default: "",
  },
  street: {
    ...DEFAULT_VALIDATION,
    minLength: 0,
    default: "",
  },
  houseNumber: {
    type: Number,
    trim: true,
    minLength: 1,
    default: 0,
  },
  zip: {
    type: Number,
    trim: true,
    minLength: 4,
    default: 0,
  },
});

module.exports = Address;

const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/MongooseValidators");

const securityQa = new mongoose.Schema({
  grandfatherName: { ...DEFAULT_VALIDATION, required: true },
  firstSchool: { ...DEFAULT_VALIDATION, required: true },
  motherLastName: { ...DEFAULT_VALIDATION, required: true },
});

module.exports = securityQa;

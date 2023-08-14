const mongoose = require("mongoose");
const Image = require("./Image");
const { URL, DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const Section = new mongoose.Schema({
  title: { ...DEFAULT_VALIDATION, minLength: 2, required: true },
  text: { ...DEFAULT_VALIDATION, maxLength: 4096 },
  image: Image,
  video: URL,
});

module.exports = Section;

const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");
const Section = require("./Section");

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: { ...DEFAULT_VALIDATION, minLength: 2, required: true },
  subtitle: { ...DEFAULT_VALIDATION, minLength: 2, required: true },
  tags: [String],
  usersRate: [
    {
      userId: { type: String },
      rate: { type: Number },
    },
  ],
  rate: { type: Number, default: 0 },
  comments: [String],
  favorites: [String],
  sections: [Section],
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;

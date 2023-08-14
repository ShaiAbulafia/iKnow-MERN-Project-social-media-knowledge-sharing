const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  text: { ...DEFAULT_VALIDATION, minLength: 1, maxLength: 512, required: true },
  like: [String],
  dislike: [String],
  subcomments: [String],
  postId: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

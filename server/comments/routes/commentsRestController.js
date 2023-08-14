const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  createComment,
  deleteComment,
  dislikeComment,
  getSubComments,
  likeComment,
  updateComment,
  createSubcomment,
  getPostComments,
} = require("../models/commentsAccessDataService");
const validateComment = require("../validations/commentValidationService");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.body;
    const user = req.user;
    if (!user) return handleError(res, 403, "Log in first");

    const { error } = validateComment(comment);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const newComment = await createComment(comment, user._id, postId);
    return res.status(201).send(newComment);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const comment = req.body;
    const commentId = req.params.id;
    const user = req.user;

    if (!user) return handleError(res, 403, "Log in first");

    const { error } = validateComment(comment);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    let subcomment = await createSubcomment(commentId, comment, user._id);
    return res.status(201).send(subcomment);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/like/:id", auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;

    const comment = await likeComment(commentId, userId);
    return res.send(comment);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/dislike/:id", auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;

    const comment = await dislikeComment(commentId, userId);
    return res.send(comment);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const stringList = id.split("-");

    const comment = await deleteComment(stringList[0], stringList[1], user);
    return res.send(comment);
    return res.send({});
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/sub/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const subcomments = await getSubComments(commentId);
    return res.send(subcomments);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await getPostComments(id);
    return res.send(comments);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = req.body;
    const user = req.user;

    if (!user.isAdmin && user._id !== comment.userId) {
      const message =
        "Authorization Error: Only admin and the user who commented can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateComment(comment);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    let editedComment = await updateComment(commentId, comment);
    return res.send(editedComment);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

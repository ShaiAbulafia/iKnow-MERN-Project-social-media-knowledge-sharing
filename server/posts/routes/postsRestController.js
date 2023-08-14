const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  createPost,
  deletePost,
  getPosts,
  getPost,
  updatePost,
  ratePost,
  favPost,
  userPosts,
} = require("../models/postsAccessDataService");
const validatePost = require("../validations/postValidationService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    return res.send(posts);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/userPosts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await userPosts(id);
    return res.send(posts);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPost(id);
    return res.send(post);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const post = req.body;
    const user = req.user;
    if (!user) return handleError(res, 403, "Log in first");

    const { error } = validatePost(post);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const newPost = await createPost(post, user._id);

    return res.status(201).send(newPost);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = req.body;
    const user = req.user;

    const { error } = validatePost(post);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    let editedPost = await updatePost(postId, post, user);
    return res.send(editedPost);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/rate/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const userRate = req.body;
    const post = await ratePost(postId, userId, userRate.userRate);
    return res.send(post);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/fav/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await favPost(postId, userId);
    return res.send(post);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const user = req.user;

    const post = await deletePost(postId, user);
    return res.send(post);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

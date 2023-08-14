const Post = require("./mongodb/Post");
const { handleBadRequest } = require("../../utils/handleErrors");
const User = require("../../users/models/mongodb/User");
const {
  newNotification,
} = require("../../notifications/models/notificationsAccessDataService");
const {
  deleteSubcomments,
} = require("../../comments/models/commentsAccessDataService");
const DB = process.env.DB || "MONGODB";

const getPosts = async () => {
  if (DB === "MONGODB") {
    try {
      const posts = await Post.find();
      return Promise.resolve(posts);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get posts not in mongodb");
};

const userPosts = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const posts = await Post.find({ userId: userId });
      return Promise.resolve(posts);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get posts not in mongodb");
};

const getPost = async (postId) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);
      if (!post) throw new Error("Could not find this post in the database");
      return Promise.resolve(post);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get post not in mongodb");
};

const createPost = async (userPost, userId) => {
  if (DB === "MONGODB") {
    try {
      let post = new Post({ userId: userId, ...userPost });
      post = await post.save();

      let user = await User.findById(userId);
      let userName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
      if (user.name.middle === "")
        followerName = `${user.name.first} ${user.name.last}`;

      for (let follower of user.follows) {
        newNotification({
          userId: follower,
          title: `${userName} published new post!`,
          avatarUrl: user.image.url,
          avatarAlt: user.image.alt,
          target: `posts/${post._id}`,
        });
      }

      return Promise.resolve(post);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create post not in mongodb");
};

const updatePost = async (postId, userPost, user) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);
      if (!post)
        throw new Error("A post with this ID cannot be found in the database");

      if (!user.isAdmin && post.userId !== user._id)
        throw new Error(
          "Authorization Error: Only admin and the user who posted can update this post"
        );

      let updatedPost = await Post.findByIdAndUpdate(postId, userPost, {
        new: true,
      });

      return Promise.resolve(updatedPost);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("update post not in mongodb");
};

const ratePost = async (postId, userId, userRate) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);
      if (!post)
        throw new Error("A post with this ID cannot be found in the database");
      if (post.userId === userId)
        throw new Error("You cant rate your own post");
      const postRates = post.usersRate.find((user) => user.userId === userId);

      if (!postRates) {
        post.usersRate.push({ userId: userId, rate: userRate });

        let user = await User.findById(post.userId);
        user.kPoints = Number(user.kPoints) + Number(userRate);
        user = await user.save();
        let postRateSum = 0;
        let postRateCount = 0;
        for (let userRating of post.usersRate) {
          postRateSum = postRateSum + userRating.rate;
          postRateCount = postRateCount + 1;
        }
        post.rate = postRateSum / postRateCount;
        post = await post.save();

        let ratedUser = await User.findById(userId);
        let userName = `${ratedUser.name.first} ${ratedUser.name.middle} ${ratedUser.name.last}`;
        if (ratedUser.name.middle === "")
          followerName = `${ratedUser.name.first} ${ratedUser.name.last}`;

        newNotification({
          userId: post.userId,
          title: `${userName} rated your post ${userRate}. You earned ${Number(
            userRate
          )} K-Points!`,
          avatarUrl: ratedUser.image.url,
          avatarAlt: ratedUser.image.alt,
          target: `posts/${postId}`,
        });
        return Promise.resolve(post);
      }

      const postRatesFiltered = post.usersRate.filter(
        (user) => user.userId !== userId
      );
      postRatesFiltered.push({ userId: userId, rate: userRate });
      post.usersRate = postRatesFiltered;
      let postRateSum = 0;
      let postRateCount = 0;
      for (let userRating of post.usersRate) {
        postRateSum = postRateSum + userRating.rate;
        postRateCount = postRateCount + 1;
      }

      post.rate = postRateSum / postRateCount;
      post = await post.save();
      return Promise.resolve(post);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("post rate not in mongodb");
};

const favPost = async (postId, userId) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);
      if (!post)
        throw new Error("A post with this ID cannot be found in the database");
      const postFavs = post.favorites.find((id) => id === userId);

      if (!postFavs) {
        post.favorites.push(userId);
        post = await post.save();
        return Promise.resolve(post);
      }

      const postFavsFiltered = post.favorites.filter((id) => id !== userId);

      post.favorites = postFavsFiltered;
      post = await post.save();
      return Promise.resolve(post);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("post rate not in mongodb");
};

const deletePost = async (postId, user) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);

      if (!post)
        throw new Error("A post with this ID cannot be found in the database");

      if (!user.isAdmin && user._id !== post.userId) {
        throw new Error(
          "Authorization Error: Only admin and the user who posted can delete this post"
        );
      }
      for (let commentId of post.comments) {
        deleteSubcomments(commentId);
      }
      post = await Post.findByIdAndDelete(postId);

      return Promise.resolve(post);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("post deleted not in mongodb");
};

exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.ratePost = ratePost;
exports.favPost = favPost;
exports.deletePost = deletePost;
exports.userPosts = userPosts;

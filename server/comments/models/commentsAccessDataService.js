const Comment = require("./mongodb/Comment");
const { handleBadRequest } = require("../../utils/handleErrors");
const Post = require("../../posts/models/mongodb/Post");
const User = require("../../users/models/mongodb/User");
const {
  newNotification,
} = require("../../notifications/models/notificationsAccessDataService");
const DB = process.env.DB || "MONGODB";

const getSubComments = async (commentId) => {
  if (DB === "MONGODB") {
    try {
      const comment = await Comment.findById(commentId);

      let commentsArr = [];
      for (let commentId of comment.subcomments) {
        const fullComment = await Comment.findById(commentId);
        commentsArr.push(fullComment);
      }
      return Promise.resolve(commentsArr);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get comments not in mongodb");
};

const getPostComments = async (postId) => {
  if (DB === "MONGODB") {
    try {
      const post = await Post.findById(postId);
      if (!post)
        throw new Error("A post with this ID cannot be found in the database");

      let commentsArr = [];
      for (let commentId of post.comments) {
        const comment = await Comment.findById(commentId);
        commentsArr.push(comment);
      }
      return Promise.resolve(commentsArr);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get comments not in mongodb");
};
const createComment = async (userComment, userId, postId) => {
  if (DB === "MONGODB") {
    try {
      let post = await Post.findById(postId);
      if (!post)
        throw new Error("A post with this ID cannot be found in the database");
      let comment = new Comment({
        userId: userId,
        postId: postId,
        ...userComment,
      });
      comment = await comment.save();
      post.comments.push(comment._id);
      post = await post.save();

      let user = await User.findById(userId);
      if (userId !== post.userId) {
        let userName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
        if (user.name.middle === "")
          followerName = `${user.name.first} ${user.name.last}`;
        const title = () => {
          if (post.title.length <= 15)
            return `${userName} commented on your post '${post.title.slice(
              0,
              20
            )}'`;
          return `${userName} commented on your post '${post.title.slice(
            0,
            20
          )}...'`;
        };
        newNotification({
          userId: post.userId,
          title: title(),
          avatarUrl: user.image.url,
          avatarAlt: user.image.alt,
          target: `posts/${postId}`,
        });
      }

      return Promise.resolve(post.comments);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create comment not in mongodb");
};
const createSubcomment = async (commentId, userComment, userId) => {
  if (DB === "MONGODB") {
    try {
      let mainComment = await Comment.findById(commentId);
      let comment = new Comment({
        userId: userId,
        postId: mainComment.postId,
        ...userComment,
      });
      mainComment.subcomments.push(comment._id);

      comment = await comment.save();
      mainComment = await mainComment.save();

      let user = await User.findById(userId);
      let userName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
      if (user.name.middle === "")
        userName = `${user.name.first} ${user.name.last}`;

      const title = () => {
        if (mainComment.text.length <= 15)
          return `${userName} commented on your comment '${mainComment.text.slice(
            0,
            20
          )}'`;
        return `${userName} commented on your post '${mainComment.text.slice(
          0,
          20
        )}...'`;
      };
      if (userId !== mainComment.userId) {
        newNotification({
          userId: mainComment.userId,
          title: title(),
          avatarUrl: user.image.url,
          avatarAlt: user.image.alt,
          target: `posts/${mainComment.postId}`,
        });
      }
      return Promise.resolve(comment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create comment not in mongodb");
};

const updateComment = async (commentId, userComment) => {
  if (DB === "MONGODB") {
    try {
      let comment = await Comment.findByIdAndUpdate(
        commentId,
        { text: userComment.text },
        {
          new: true,
        }
      );

      if (!comment)
        throw new Error(
          "A comment with this ID cannot be found in the database"
        );

      return Promise.resolve(comment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("update comment not in mongodb");
};

const likeComment = async (commentId, userId) => {
  if (DB === "MONGODB") {
    try {
      let comment = await Comment.findById(commentId);
      if (!comment)
        throw new Error(
          "A comment with this ID cannot be found in the database"
        );

      const commentLikes = comment.like.find((id) => id === userId);

      if (!commentLikes) {
        const commentDislikes = comment.dislike.find((id) => id === userId);

        if (!!commentDislikes) {
          const dislikeFiltered = comment.dislike.filter((id) => id !== userId);
          comment.dislike = dislikeFiltered;
        }

        comment.like.push(userId);
        comment = await comment.save();

        let user = await User.findById(userId);
        let userName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
        if (user.name.middle === "")
          followerName = `${user.name.first} ${user.name.last}`;
        const title = () => {
          if (comment.text.length <= 15)
            return `${userName} liked your comment '${comment.text.slice(
              0,
              20
            )}'`;
          return `${userName} liked your post '${comment.text.slice(
            0,
            20
          )}...'`;
        };
        newNotification({
          userId: comment.userId,
          title: title(),
          avatarUrl: user.image.url,
          avatarAlt: user.image.alt,
          target: `posts/${comment.postId}`,
        });
        return Promise.resolve(comment);
      }

      const likeFiltered = comment.like.filter((id) => id !== userId);
      comment.like = likeFiltered;

      const commentDislikes = comment.dislike.find((id) => id === userId);

      if (!!commentDislikes) {
        const dislikeFiltered = comment.like.filter((id) => id !== userId);
        comment.dislike = dislikeFiltered;
      }
      comment = await comment.save();
      return Promise.resolve(comment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("post like not in mongodb");
};

const dislikeComment = async (commentId, userId) => {
  if (DB === "MONGODB") {
    try {
      let comment = await Comment.findById(commentId);
      if (!comment)
        throw new Error(
          "A comment with this ID cannot be found in the database"
        );

      const commentDislike = comment.dislike.find((id) => id === userId);

      if (!commentDislike) {
        const commentLikes = comment.like.find((id) => id === userId);

        if (!!commentLikes) {
          const likeFiltered = comment.like.filter((id) => id !== userId);
          comment.like = likeFiltered;
        }
        comment.dislike.push(userId);
        comment = await comment.save();

        let user = await User.findById(userId);
        let userName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
        if (user.name.middle === "")
          followerName = `${user.name.first} ${user.name.last}`;

        const title = () => {
          if (comment.text.length <= 15)
            return `${userName} disliked your comment '${comment.text.slice(
              0,
              20
            )}'`;
          return `${userName} disliked your post '${comment.text.slice(
            0,
            20
          )}...'`;
        };
        newNotification({
          userId: comment.userId,
          title: title(),
          avatarUrl: user.image.url,
          avatarAlt: user.image.alt,
          target: `posts/${comment.postId}`,
        });
        return Promise.resolve(comment);
      }

      const dislikeFiltered = comment.dislike.filter((id) => id !== userId);
      comment.dislike = dislikeFiltered;

      const commentLikes = comment.like.find((id) => id === userId);

      if (!!commentLikes) {
        const likeFiltered = comment.like.filter((id) => id !== userId);
        comment.like = likeFiltered;
      }
      comment = await comment.save();
      return Promise.resolve(comment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("post dislike not in mongodb");
};

const deleteComment = async (commentId, postId, user) => {
  if (DB === "MONGODB") {
    try {
      let comment = await Comment.findById(commentId);

      if (!comment)
        throw new Error(
          "A comment with this ID cannot be found in the database"
        );

      if (!user.isAdmin && user._id !== comment.userId) {
        throw new Error(
          "Authorization Error: Only admin and the user who commented can delete this comment"
        );
      }

      let post = await Post.findById(postId);

      if (!post) {
        let mainComment = await Comment.findById(postId);
        if (!mainComment)
          throw new Error("This comment cannot be found in the database");
        const commentsArr = mainComment.subcomments.filter(
          (id) => id !== commentId
        );
        mainComment.subcomments = commentsArr;
        mainComment = await mainComment.save();
        await deleteSubcomments(commentId);
        return Promise.resolve(comment);
      }

      const commentsArr = post.comments.filter((id) => id !== commentId);
      post.comments = commentsArr;
      post = await post.save();
      await deleteSubcomments(commentId);

      return Promise.resolve(comment);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("comment deleted not in mongodb");
};

const deleteSubcomments = async (commentId) => {
  if (DB === "MONGODB") {
    try {
      let comment = await Comment.findById(commentId);

      if (!comment) return;

      if (!comment.subcomments.length) {
        comment = await Comment.findByIdAndDelete(commentId);
        return;
      }

      for (let subcommentId of comment.subcomments) {
        deleteSubcomments(subcommentId);
      }

      comment = await Comment.findByIdAndDelete(commentId);

      return;
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("comment deleted not in mongodb");
};

exports.getSubComments = getSubComments;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.likeComment = likeComment;
exports.dislikeComment = dislikeComment;
exports.deleteComment = deleteComment;
exports.createSubcomment = createSubcomment;
exports.getPostComments = getPostComments;
exports.deleteSubcomments = deleteSubcomments;

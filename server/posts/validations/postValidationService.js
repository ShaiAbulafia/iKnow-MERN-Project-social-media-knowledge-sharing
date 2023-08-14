const validatePostWithJoi = require("./Joi/validatePostWithJoi");

const validator = undefined || "Joi";

const validatePost = (post) => {
  if (validator === "Joi") return validatePostWithJoi(post);
};

module.exports = validatePost;

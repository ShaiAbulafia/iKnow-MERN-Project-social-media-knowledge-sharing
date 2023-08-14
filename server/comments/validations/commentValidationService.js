const validateCommentWithJoi = require("./Joi/validateCommentWithJoi");

const validator = undefined || "Joi";

const validateComment = (comment) => {
  if (validator === "Joi") return validateCommentWithJoi(comment);
};

module.exports = validateComment;

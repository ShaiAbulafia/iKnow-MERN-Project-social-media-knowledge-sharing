const Joi = require("joi");

const validateCommentWithJoi = (comment) => {
  const schema = Joi.object({
    text: Joi.string().min(1).max(512).required(),
  });

  return schema.validate(comment);
};

module.exports = validateCommentWithJoi;

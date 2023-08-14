const Joi = require("joi");

const validateContactWithJoi = (contact) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    text: Joi.string().min(2).max(256).required(),
  });

  return schema.validate(contact);
};

module.exports = validateContactWithJoi;

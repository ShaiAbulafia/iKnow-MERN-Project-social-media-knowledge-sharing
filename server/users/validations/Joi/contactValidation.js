const Joi = require("joi");

const contactValidation = (user) => {
  const schema = Joi.object({
    phone: Joi.string()
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({ message: 'user "phone" mast be a valid phone number' })
      .allow(""),
    address: Joi.object()
      .keys({
        state: Joi.string().min(2).max(256).allow(""),
        country: Joi.string().min(2).max(256).allow(""),
        city: Joi.string().min(2).max(256).allow(""),
        street: Joi.string().min(2).max(256).allow(""),
        houseNumber: Joi.number(),
        zip: Joi.number(),
      })
      .required(),
  });
  return schema.validate(user);
};

module.exports = contactValidation;

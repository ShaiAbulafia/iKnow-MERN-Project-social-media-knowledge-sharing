import Joi from "joi";

const addressSchema = {
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'user "phone" must be a valid phone number' }),
  alt: Joi.string().min(2).max(256),
  state: Joi.string().min(2).max(256),
  country: Joi.string().min(2).max(256),
  city: Joi.string().min(2).max(256),
  street: Joi.string().min(2).max(256),
  houseNumber: Joi.number().min(1),
  zip: Joi.number().min(1),
};

export default addressSchema;

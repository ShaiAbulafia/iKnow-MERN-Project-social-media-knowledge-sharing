import Joi from "joi";

const signupSchema = {
  first: Joi.string().min(2).max(256).required(),
  middle: Joi.string().min(2).max(256).allow(""),
  last: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'user "phone" must be a valid phone number' })
    .allow(""),
  email: Joi.string()
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'user "mail" must be a valid mail' })
    .required(),
  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .rule({
      message:
        'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
    })
    .required(),
  url: Joi.string()
    .ruleset.regex(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    )
    .rule({ message: "user image must be a valid url" })
    .allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
  aboutMe: Joi.string().min(2).max(256).required(),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).allow(""),
  city: Joi.string().min(2).max(256).allow(""),
  street: Joi.string().min(2).max(256).allow(""),
  houseNumber: Joi.number(),
  zip: Joi.number(),
  grandfatherName: Joi.string().min(2).max(256).required(),
  firstSchool: Joi.string().min(2).max(256).required(),
  motherLastName: Joi.string().min(2).max(256).required(),
};

export default signupSchema;

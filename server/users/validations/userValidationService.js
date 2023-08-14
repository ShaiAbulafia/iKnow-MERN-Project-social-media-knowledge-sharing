const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
const userUpdateValidation = require("./Joi/userUpdateValidation");
const contactValidation = require("./Joi/contactValidation");
const userResetPassValidation = require("./Joi/userResetPassValidation");

const validator = undefined || "Joi";

const validateRegistration = (user) => {
  if (validator === "Joi") return registerValidation(user);
};

const validateLogin = (user) => {
  if (validator === "Joi") return loginValidation(user);
};

const validateUserUpdate = (user) => {
  if (validator === "Joi") return userUpdateValidation(user);
};

const validateContact = (user) => {
  if (validator === "Joi") return contactValidation(user);
};
const validateResetPass = (user) => {
  if (validator === "Joi") return userResetPassValidation(user);
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateUserUpdate = validateUserUpdate;
exports.validateContact = validateContact;
exports.validateResetPass = validateResetPass;

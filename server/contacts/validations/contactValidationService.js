const validateContactWithJoi = require("./Joi/validateContactWithJoi");

const validator = undefined || "Joi";

const validateContact = (contact) => {
  if (validator === "Joi") return validateContactWithJoi(contact);
};

module.exports = validateContact;

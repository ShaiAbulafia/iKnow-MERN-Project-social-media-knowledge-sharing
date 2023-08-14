const validateProductWithJoi = require("./Joi/validateProductWithJoi");

const validator = undefined || "Joi";

const validateProduct = (product) => {
  if (validator === "Joi") return validateProductWithJoi(product);
};

module.exports = validateProduct;

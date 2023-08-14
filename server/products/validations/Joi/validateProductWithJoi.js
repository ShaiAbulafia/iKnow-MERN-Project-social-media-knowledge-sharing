const Joi = require("joi");

const validateProductWithJoi = (product) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    category: Joi.string().min(2).max(256).required(),
    brand: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().required(),
    productNumber: Joi.number().allow(""),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: 'product.image "url" mast be a valid url' }),
        alt: Joi.string().min(2).max(256),
      })
      .required(),
  });

  return schema.validate(product);
};

module.exports = validateProductWithJoi;

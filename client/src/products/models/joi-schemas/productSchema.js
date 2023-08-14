import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const productSchema = {
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  category: Joi.string().min(2).max(256).required(),
  brand: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  imageUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'product.image "url" mast be a valid url' }),
  imageAlt: Joi.string().min(2).max(256),
};

export default productSchema;

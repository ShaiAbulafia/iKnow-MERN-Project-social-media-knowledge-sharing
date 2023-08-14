import Joi from "joi";

const contactSchema = {
  title: Joi.string().min(2).max(256).required(),
  text: Joi.string().min(2).max(256).required(),
};

export default contactSchema;

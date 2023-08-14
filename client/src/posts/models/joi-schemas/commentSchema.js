import Joi from "joi";

const commentSchema = {
  text: Joi.string().min(2).max(512).required(),
};

export default commentSchema;

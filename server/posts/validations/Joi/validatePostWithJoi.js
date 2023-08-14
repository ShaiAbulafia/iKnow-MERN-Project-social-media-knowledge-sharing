const Joi = require("joi");

const validatePostWithJoi = (post) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    tags: Joi.array().items(Joi.string().min(2).max(256).allow("")),
    sections: Joi.array()
      .items(
        Joi.object().keys({
          title: Joi.string().min(2).max(256).required(),
          text: Joi.string().min(2).max(4096).allow(""),
          image: Joi.object()
            .keys({
              url: Joi.string()
                .ruleset.regex(urlRegex)
                .rule({
                  message: 'post.section.image "url" mast be a valid url',
                })
                .allow(""),
              alt: Joi.string().min(2).max(256).allow(""),
            })
            .required(),
          video: Joi.string()
            .ruleset.regex(urlRegex)
            .rule({
              message: 'post.section.image "url" mast be a valid url',
            })
            .allow(""),
        })
      )
      .required(),
  });

  return schema.validate(post);
};

module.exports = validatePostWithJoi;

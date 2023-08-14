import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const postSchema = {
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  tag1: Joi.string().min(2).max(256).allow(""),
  tag2: Joi.string().min(2).max(256).allow(""),
  tag3: Joi.string().min(2).max(256).allow(""),
  tag4: Joi.string().min(2).max(256).allow(""),
  tag5: Joi.string().min(2).max(256).allow(""),
  section1_title: Joi.string().min(2).max(256).required(),
  section1_text: Joi.string().min(2).max(4096).allow(""),
  section1_image_url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
  section1_image_alt: Joi.string().min(2).max(256).allow(""),
  section1_video: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
  section2_title: Joi.string().min(2).max(256).allow(""),
  section2_text: Joi.string().min(2).max(4096).allow(""),
  section2_image_url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: 'post.section.image "url" mast be a valid url',
    })
    .allow(""),
  section2_image_alt: Joi.string().min(2).max(256).allow(""),
  section2_video: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
  section3_title: Joi.string().min(2).max(256).allow(""),
  section3_text: Joi.string().min(2).max(4096).allow(""),
  section3_image_url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: 'post.section.image "url" mast be a valid url',
    })
    .allow(""),
  section3_image_alt: Joi.string().min(2).max(256).allow(""),
  section3_video: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
  section4_title: Joi.string().min(2).max(256).allow(""),
  section4_text: Joi.string().min(2).max(4096).allow(""),
  section4_image_url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: 'post.section.image "url" mast be a valid url',
    })
    .allow(""),
  section4_image_alt: Joi.string().min(2).max(256).allow(""),
  section4_video: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
  section5_title: Joi.string().min(2).max(256).allow(""),
  section5_text: Joi.string().min(2).max(4096).allow(""),
  section5_image_url: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: 'post.section.image "url" mast be a valid url',
    })
    .allow(""),
  section5_image_alt: Joi.string().min(2).max(256).allow(""),
  section5_video: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({
      message: "url mast be a valid url",
    })
    .allow(""),
};

export default postSchema;

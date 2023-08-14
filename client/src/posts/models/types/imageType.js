import { shape, string } from "prop-types";

const imageType = shape({
  url: string,
  alt: string,
});

export default imageType;

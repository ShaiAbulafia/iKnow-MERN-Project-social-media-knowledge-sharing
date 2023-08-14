import { shape, string } from "prop-types";
import imageType from "./imageType";

const sectionType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  text: string,
  image: imageType,
  video: string,
});

export default sectionType;

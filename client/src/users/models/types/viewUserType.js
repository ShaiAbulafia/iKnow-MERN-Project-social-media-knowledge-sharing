import { shape, string, number, arrayOf } from "prop-types";
import nameType from "./nameType";
import imageType from "./imageType";

const viewUserType = shape({
  _id: string.isRequired,
  name: nameType.isRequired,
  image: imageType.isRequired,
  createdAt: string.isRequired,
  aboutMe: string.isRequired,
  follows: arrayOf(string).isRequired,
});

export default viewUserType;

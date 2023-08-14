import { shape, string } from "prop-types";
import nameType from "../../../users/models/types/nameType";
import imageType from "../../../users/models/types/imageType";

const userDisplayType = shape({
  _id: string.isRequired,
  name: nameType,
  image: imageType,
});

export default userDisplayType;

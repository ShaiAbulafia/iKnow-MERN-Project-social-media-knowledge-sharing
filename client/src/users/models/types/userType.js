import { shape, string, bool, number, arrayOf } from "prop-types";
import nameType from "./nameType";
import imageType from "./imageType";
import addressType from "./addressType";
import securityQaType from "./securityQaType";

const userType = shape({
  _id: string.isRequired,
  name: nameType.isRequired,
  phone: string,
  email: string.isRequired,
  password: string,
  aboutMe: string.isRequired,
  kPoints: number.isRequired,
  image: imageType.isRequired,
  address: addressType,
  isAdmin: bool.isRequired,
  createdAt: string.isRequired,
  securityQa: securityQaType,
  follows: arrayOf(string).isRequired,
});

export default userType;

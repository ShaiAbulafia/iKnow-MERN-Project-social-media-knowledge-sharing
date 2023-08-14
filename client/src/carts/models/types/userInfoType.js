import { shape, string } from "prop-types";
import addressType from "../../../users/models/types/addressType";

const userInfoType = shape({
  phone: string.isRequired,
  address: addressType,
});

export default userInfoType;

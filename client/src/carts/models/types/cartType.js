import { shape, string, bool, arrayOf } from "prop-types";
import productsType from "./productsType";

const cartType = shape({
  _id: string.isRequired,
  userId: string.isRequired,
  products: arrayOf(productsType).isRequired,
  active: bool.isRequired,
});

export default cartType;

import { shape, string, number, arrayOf } from "prop-types";
import productsType from "./productsType";
import addressType from "../../../users/models/types/addressType";

const orderType = shape({
  _id: string.isRequired,
  orderNumber: number.isRequired,
  userId: string.isRequired,
  products: arrayOf(productsType).isRequired,
  totalPrice: number.isRequired,
  createdAt: string.isRequired,
  status: string.isRequired,
  kPointsUsed: number.isRequired,
  orderAddress: addressType.isRequired,
  contactPhone: string.isRequired,
});

export default orderType;

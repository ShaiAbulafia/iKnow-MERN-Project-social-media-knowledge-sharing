import { shape, number, string } from "prop-types";

const productsType = shape({
  productId: string.isRequired,
  amount: number.isRequired,
});

export default productsType;

import { shape, number } from "prop-types";
import productType from "../../../products/models/types/productType";

const fullProductsList = shape({
  product: productType.isRequired,
  amount: number.isRequired,
});

export default fullProductsList;

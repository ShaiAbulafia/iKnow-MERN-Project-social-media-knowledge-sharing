import { shape, string, number, arrayOf } from "prop-types";
import imageType from "./imageType";

const productType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  category: string.isRequired,
  brand: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  stock: number.isRequired,
  image: imageType.isRequired,
  productNumber: number.isRequired,
  createdAt: string.isRequired,
  wishes: arrayOf(string).isRequired,
});

export default productType;

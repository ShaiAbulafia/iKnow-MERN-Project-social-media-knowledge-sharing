import { shape, string, number } from "prop-types";

const addressType = shape({
  state: string.isRequired,
  country: string.isRequired,
  city: string.isRequired,
  street: string.isRequired,
  houseNumber: number.isRequired,
  zip: number.isRequired,
});

export default addressType;

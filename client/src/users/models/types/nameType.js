import { shape, string } from "prop-types";

const nameType = shape({
  first: string.isRequired,
  middle: string,
  last: string.isRequired,
});

export default nameType;

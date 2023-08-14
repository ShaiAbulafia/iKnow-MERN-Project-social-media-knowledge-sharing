import { number, shape, string } from "prop-types";

const usersRateType = shape({
  userId: string,
  rate: number,
});

export default usersRateType;

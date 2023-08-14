import { bool, shape, string } from "prop-types";

const contactType = shape({
  userId: string.isRequired,
  title: string.isRequired,
  text: string.isRequired,
  createdAt: string.isRequired,
  read: bool.isRequired,
});

export default contactType;

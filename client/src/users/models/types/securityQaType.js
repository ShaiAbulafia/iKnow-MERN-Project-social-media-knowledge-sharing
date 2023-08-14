import { shape, string } from "prop-types";

const securityQaType = shape({
  grandfatherName: string.isRequired,
  firstSchool: string.isRequired,
  motherLastName: string.isRequired,
});

export default securityQaType;

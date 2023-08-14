import { shape, string, number, arrayOf } from "prop-types";
import usersRateType from "./usersRateType";
import sectionType from "./sectionType";

const postType = shape({
  _id: string.isRequired,
  userId: string.isRequired,
  createdAt: string.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  tags: arrayOf(string).isRequired,
  usersRate: arrayOf(usersRateType).isRequired,
  rate: number.isRequired,
  comments: arrayOf(string).isRequired,
  favorites: arrayOf(string).isRequired,
  sections: arrayOf(sectionType).isRequired,
});

export default postType;

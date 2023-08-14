import { shape, string, arrayOf } from "prop-types";

const commentType = shape({
  _id: string.isRequired,
  userId: string.isRequired,
  postId: string.isRequired,
  createdAt: string.isRequired,
  text: string.isRequired,
  like: arrayOf(string).isRequired,
  dislike: arrayOf(string).isRequired,
  subcomments: arrayOf(string).isRequired,
});

export default commentType;

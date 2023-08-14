import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Typography from "@mui/material/Typography";
import commentType from "../../models/types/commentType";
import Comments from "./Comments";
import { Divider } from "@mui/material";

const CommentsFeedback = ({
  isLoading,
  error,
  comments,
  refComments,
  onDelete,
}) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!comments || !comments.length)
    return (
      <>
        <Typography variant="body1" textAlign="left" m={2} component="div">
          No comments yet.
        </Typography>
      </>
    );
  if (comments)
    return (
      <>
        <Comments
          comments={comments}
          refComments={refComments}
          onDelete={onDelete}
        />
      </>
    );
  return null;
};

CommentsFeedback.propTypes = {
  comments: arrayOf(commentType),
  isLoading: bool.isRequired,
  error: string,
  refComments: func.isRequired,
  onDelete: func.isRequired,
};

export default CommentsFeedback;

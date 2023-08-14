import React from "react";
import { string, bool, func, arrayOf } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Typography from "@mui/material/Typography";
import Paper from "./paper/Paper";
import postType from "../models/types/postType";
import CommentsSection from "./comments/CommentsSection";

const PostFeedback = ({ isLoading, error, post, onRate }) => {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (!post)
    return (
      <Typography variant="body1">
        Oops.. cant find the product in database that you were looking for!
      </Typography>
    );
  if (post)
    return (
      <>
        <Paper post={post} onRate={onRate} />
        <CommentsSection />
      </>
    );
  return null;
};

PostFeedback.propTypes = {
  post: postType,
  isLoading: bool.isRequired,
  error: string,
  onRate: func.isRequired,
};

export default PostFeedback;

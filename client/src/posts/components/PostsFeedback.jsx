import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Posts from "./Posts";
import Typography from "@mui/material/Typography";
import postType from "../models/types/postType";
import { Paper } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import PostsMenu from "./PostsMenu";

const PostsFeedback = ({ isLoading, error, posts, onDelete, onFav }) => {
  const { isDark } = useTheme();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (posts && !posts.length)
    return (
      <>
        <PostsMenu />
        <Paper
          sx={{
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Oops.. there are no posts in database that match the parameters you
            entered!
          </Typography>
        </Paper>
      </>
    );
  if (posts)
    return (
      <>
        <PostsMenu />
        <Posts
          posts={posts.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          })}
          onDelete={onDelete}
          onFav={onFav}
        />
      </>
    );
  return null;
};

PostsFeedback.propTypes = {
  posts: arrayOf(postType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
  onFav: func.isRequired,
};
PostsFeedback.defaultProps = {
  onFav: () => {},
};

export default PostsFeedback;

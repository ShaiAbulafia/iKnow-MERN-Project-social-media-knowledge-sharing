import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Posts from "./Posts";
import Typography from "@mui/material/Typography";
import postType from "../models/types/postType";
import { Paper } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";

const PostsFeedbackTop = ({ isLoading, error, posts, onDelete, onFav }) => {
  const { isDark } = useTheme();
  const date = new Date();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (posts && !posts.length)
    return (
      <>
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
        <Posts
          posts={posts
            .filter(
              (post) => new Date(post.createdAt).getMonth() === date.getMonth()
            )
            .sort((a, b) => {
              return b.rate - a.rate;
            })
            .slice(0, 5)}
          onDelete={onDelete}
          onFav={onFav}
        />
      </>
    );
  return null;
};

PostsFeedbackTop.propTypes = {
  posts: arrayOf(postType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
  onFav: func.isRequired,
};
PostsFeedbackTop.defaultProps = {
  onFav: () => {},
};

export default PostsFeedbackTop;

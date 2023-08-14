import React from "react";
import { arrayOf, string, bool, func } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";
import Posts from "../../../posts/components/Posts";
import postType from "../../../posts/models/types/postType";

const UserPosts = ({ isLoading, error, posts, onDelete, onFav }) => {
  const { isDark } = useTheme();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (posts && !posts.length)
    return (
      <>
        <Paper
          elevation={3}
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
            No posts.
          </Typography>
        </Paper>
      </>
    );
  if (posts)
    return (
      <>
        <Posts posts={posts} onDelete={onDelete} onFav={onFav} />
      </>
    );
  return null;
};

UserPosts.propTypes = {
  posts: arrayOf(postType),
  isLoading: bool.isRequired,
  error: string,
  onDelete: func.isRequired,
  onFav: func.isRequired,
};
UserPosts.defaultProps = {
  onFav: () => {},
};

export default UserPosts;

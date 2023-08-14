import { useCallback, useEffect } from "react";
import viewUserType from "../../models/types/viewUserType";
import { Divider, Grid, Typography } from "@mui/material";
import PaperBody from "./PaperBody";
import PaperImage from "./PaperImage";
import usePosts from "../../../posts/hooks/usePosts";
import UserPosts from "./UserPosts";
import { makeFirstLetterCapital } from "../../../utils/algoMethods";

const Paper = ({ user }) => {
  const { valuePost, handleGetUserPosts, handleDeletePost } = usePosts();

  useEffect(() => {
    handleGetUserPosts(user._id);
  }, []);

  const onDeletePost = useCallback(
    async (postId) => {
      await handleDeletePost(postId);
      await handleGetUserPosts(user._id);
    },
    [handleDeletePost, handleGetUserPosts, user._id]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={8}>
        <PaperBody userObj={user} />
      </Grid>
      <Grid item xs={12} sm={5} md={4}>
        <PaperImage user={user} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight={700}
          textAlign={{ xs: "center", md: "left" }}
          marginX={{ xs: 0, md: 2 }}
        >
          {makeFirstLetterCapital(user.name.first)} Posts
        </Typography>
        <Divider xs={{}} />
      </Grid>

      <Grid item xs={12}>
        <UserPosts
          isLoading={valuePost.isLoading}
          posts={valuePost.filteredPosts}
          error={valuePost.error}
          onDelete={onDeletePost}
        />
      </Grid>
    </Grid>
  );
};

Paper.propTypes = {
  user: viewUserType.isRequired,
};

export default Paper;

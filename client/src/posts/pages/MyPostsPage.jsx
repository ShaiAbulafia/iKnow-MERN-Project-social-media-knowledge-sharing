import React, { useEffect, useCallback } from "react";
import PageHeader from "../../components/PageHeader";
import PostsFeedback from "../components/PostsFeedback";
import usePosts from "../hooks/usePosts";
import { useUser } from "../../users/providers/UserProvider";
import { Box } from "@mui/material";

const MyPostsPage = () => {
  const { user } = useUser();
  const { valuePost, handleGetUserPosts, handleDeletePost } = usePosts();
  useEffect(() => {
    onEnter();
  }, []);

  const onEnter = useCallback(async () => {
    if (user) await handleGetUserPosts(user._id);
  }, [handleGetUserPosts, user]);

  const onDeletePost = useCallback(
    async (postId) => {
      await handleDeletePost(postId);
      await handleGetUserPosts(user._id);
    },
    [handleDeletePost, handleGetUserPosts, user]
  );

  return (
    <Box pt={10}>
      <PostsFeedback
        isLoading={valuePost.isLoading}
        posts={valuePost.filteredPosts}
        error={valuePost.error}
        onDelete={onDeletePost}
      />
    </Box>
  );
};

export default MyPostsPage;

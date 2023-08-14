import React, { useEffect, useCallback } from "react";
import PostsFeedback from "../components/PostsFeedback";
import usePosts from "../hooks/usePosts";
import { Box } from "@mui/material";

const PostsPage = () => {
  const { valuePost, handleGetPosts, handleDeletePost } = usePosts();

  useEffect(() => {
    onEnter();
  }, []);

  const onEnter = useCallback(async () => {
    await handleGetPosts();
  }, [handleGetPosts]);

  const onDeletePost = useCallback(
    async (postId) => {
      await handleDeletePost(postId);
      await handleGetPosts();
    },
    [handleDeletePost, handleGetPosts]
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

export default PostsPage;

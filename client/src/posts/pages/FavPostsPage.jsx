import React, { useEffect, useCallback } from "react";
import PostsFeedback from "../components/PostsFeedback";
import usePosts from "../hooks/usePosts";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { Box } from "@mui/material";

const FavPostsPage = () => {
  const { user } = useUser();
  const { valuePost, handleGetFavPosts, handleDeletePost } = usePosts();

  useEffect(() => {
    onEnter();
  }, []);

  const onEnter = useCallback(async () => {
    await handleGetFavPosts();
  }, [handleGetFavPosts]);

  const onDeletePost = useCallback(
    async (postId) => {
      await handleDeletePost(postId);
      await handleGetFavPosts();
    },
    [handleDeletePost, handleGetFavPosts]
  );

  const onFavPost = useCallback(async () => {
    await handleGetFavPosts();
  }, [handleGetFavPosts]);

  if (!user) return <Navigate replace to={ROUTES.POSTS} />;
  return (
    <Box pt={10}>
      <PostsFeedback
        isLoading={valuePost.isLoading}
        posts={valuePost.filteredPosts}
        error={valuePost.error}
        onDelete={onDeletePost}
        onFav={onFavPost}
      />
    </Box>
  );
};

export default FavPostsPage;

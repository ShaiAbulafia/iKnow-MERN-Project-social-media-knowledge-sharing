import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostFeedback from "../components/PostFeedback";
import usePosts from "../hooks/usePosts";
import { Box } from "@mui/material";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { valuePost, ...rest } = usePosts();

  useEffect(() => {
    onEnter();
  }, []);

  const onEnter = useCallback(async () => {
    await rest.handleGetPost(id);
  }, [id, rest]);

  const onRatePost = useCallback(
    async (userRate) => {
      await rest.handleRatePost(id, userRate);
      onEnter();
    },
    [id, onEnter, rest]
  );

  return (
    <Box pt={6}>
      <PostFeedback
        post={valuePost.post}
        isLoading={valuePost.isLoading}
        error={valuePost.error}
        onRate={onRatePost}
      />
    </Box>
  );
};

export default PostDetailsPage;

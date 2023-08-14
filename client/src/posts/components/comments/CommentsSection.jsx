import React, { useEffect, useCallback } from "react";
import CommentsFeedback from "./CommentsFeedback";
import useComments from "../../hooks/useComments";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import { Divider, Paper, Typography } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";

const CommentsSection = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { valueComment, handleGetPostComments, handleDeleteComment } =
    useComments();

  useEffect(() => {
    handleGetPostComments(id);
  }, []);

  const refComments = useCallback(async () => {
    await handleGetPostComments(id);
  }, [handleGetPostComments, id]);

  const onNewComment = useCallback(async () => {
    await handleGetPostComments(id);
  }, [handleGetPostComments, id]);

  const onDelete = useCallback(
    async (targetId) => {
      await handleDeleteComment(targetId, id);
    },
    [id, handleDeleteComment]
  );
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          mt: 3,
          px: { xs: 1, sm: 5 },
          py: 2,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Typography
          variant="h4"
          color="text.secondary"
          marginBottom={3}
          fontWeight={700}
        >
          Comments
        </Typography>

        <NewComment onPost={onNewComment} />
        <Divider />
        <CommentsFeedback
          isLoading={valueComment.isLoading}
          error={valueComment.error}
          comments={valueComment.comments}
          refComments={refComments}
          onDelete={onDelete}
        />
      </Paper>
    </>
  );
};

CommentsSection.propTypes = {};

export default CommentsSection;

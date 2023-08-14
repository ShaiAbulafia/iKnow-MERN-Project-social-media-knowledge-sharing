import React, { useEffect, useCallback } from "react";
import CommentsFeedback from "../CommentsFeedback";
import useComments from "../../../hooks/useComments";
import { string } from "prop-types";
import { Box, Divider, Grid } from "@mui/material";
import { useTheme } from "../../../../providers/ThemeProvider";

const SubcommentsSection = ({ commentId }) => {
  const { isDark } = useTheme();
  const { valueComment, handleGetSubComments, handleDeleteComment } =
    useComments();

  useEffect(() => {
    handleGetSubComments(commentId);
  }, []);

  const refsubcomments = useCallback(async () => {
    await handleGetSubComments(commentId);
  }, [commentId, handleGetSubComments]);

  const onDelete = useCallback(
    async (targetId) => {
      await handleDeleteComment(targetId, commentId);
    },
    [commentId, handleDeleteComment]
  );

  return (
    <Box
      width="100%"
      sx={{
        borderLeft: 2,

        borderRadius: 2,
        borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
        backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        pl: 0.5,
      }}
    >
      <CommentsFeedback
        isLoading={valueComment.isLoading}
        error={valueComment.error}
        comments={valueComment.subComments}
        refComments={refsubcomments}
        onDelete={onDelete}
      />
    </Box>
  );
};

SubcommentsSection.propTypes = {
  commentId: string.isRequired,
};

export default SubcommentsSection;

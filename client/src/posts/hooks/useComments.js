import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import {
  createComment,
  createSubcomment,
  deleteComment,
  dislikeComment,
  editComment,
  getSubComments,
  likeComment,
  getPostComments,
} from "../services/commentApiService";

const useComments = () => {
  const [comments, setComments] = useState();
  const [subComments, setSubComments] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useAxios();
  const snack = useSnack();

  const requestStatus = useCallback(
    (loading, errorMessages, comments, subComments) => {
      setLoading(loading);
      setError(errorMessages);
      setComments(comments);
      setSubComments(subComments);
    },
    []
  );

  const handleGetSubComments = useCallback(
    async (commentId) => {
      try {
        setLoading(true);
        const subComments = await getSubComments(commentId);
        requestStatus(false, null, comments, subComments);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [comments, requestStatus]
  );

  const handleGetPostComments = useCallback(
    async (postId) => {
      try {
        setLoading(true);
        const comments = await getPostComments(postId);
        requestStatus(false, null, comments);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleCreateComment = useCallback(
    async (commentFromClient, postId) => {
      try {
        setLoading(true);
        const comment = await createComment(commentFromClient, postId);
        requestStatus(false, null, null, comment);
      } catch (error) {
        snack("error", error);
        requestStatus(false, error, null, null);
      }
    },
    [requestStatus, snack]
  );

  const handleCreateSubcomment = useCallback(
    async (commentId, commentFromClient) => {
      try {
        await createSubcomment(commentId, commentFromClient);
      } catch (error) {}
    },
    []
  );

  const handleUpdateComment = useCallback(async (commentId, commentText) => {
    try {
      await editComment(commentId, commentText);
      snack("success", "Updated comment successfully");
    } catch (error) {}
  }, []);

  const handleDeleteComment = useCallback(
    async (commentId, postId) => {
      try {
        await deleteComment(commentId, postId);
        snack("success", "Deleted comment successfully");
      } catch (error) {}
    },
    [snack]
  );

  const handleLikeComment = useCallback(async (commentId) => {
    try {
      await likeComment(commentId);
    } catch (error) {}
  }, []);

  const handleDislikeComment = useCallback(async (commentId) => {
    try {
      await dislikeComment(commentId);
    } catch (error) {}
  }, []);

  const valueComment = useMemo(() => {
    return {
      isLoading,
      error,
      comments,
      subComments,
    };
  }, [isLoading, error, comments, subComments]);

  return {
    valueComment,
    handleDislikeComment,
    handleLikeComment,
    handleDeleteComment,
    handleUpdateComment,
    handleCreateComment,
    handleGetPostComments,
    handleGetSubComments,
    handleCreateSubcomment,
  };
};

export default useComments;

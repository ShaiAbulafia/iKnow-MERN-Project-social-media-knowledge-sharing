import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getSubComments = async (commentId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/comments/sub/${commentId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getPostComments = async (postId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/comments/${postId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createComment = async (comment, postId) => {
  try {
    const { data } = await axios.post(`${apiUrl}/comments`, {
      comment,
      postId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createSubcomment = async (commentId, comment) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/comments/${commentId}`,
      comment
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editComment = async (commentId, comment) => {
  try {
    const { data } = await axios.put(`${apiUrl}/comments/${commentId}`, {
      text: comment,
    });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const likeComment = async (commentId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/comments/like/${commentId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const dislikeComment = async (commentId) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/comments/dislike/${commentId}`
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteComment = async (commentId, postId) => {
  try {
    const { data } = await axios.delete(
      `${apiUrl}/comments/${commentId}-${postId}`
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

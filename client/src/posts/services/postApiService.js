import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/posts`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
export const getUserPosts = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/posts/userPosts/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getPost = async (postId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/posts/${postId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createPost = async (normalizedPost) => {
  try {
    const { data } = await axios.post(`${apiUrl}/posts`, normalizedPost);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editPost = async (postId, post) => {
  try {
    const { data } = await axios.put(`${apiUrl}/posts/${postId}`, post);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const ratePost = async (postId, userRate) => {
  try {
    const { data } = await axios.post(`${apiUrl}/posts/rate/${postId}`, {
      userRate: userRate,
    });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const favPost = async (postId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/posts/fav/${postId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deletePost = async (postId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/posts/${postId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

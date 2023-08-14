import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTheUser = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getViewUser = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/view/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDisplayUser = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/usersDisplay/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDisplayUsers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/usersDisplay`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserAddress = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/address/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (userId, normalizedUser) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/users/${userId}`,
      normalizedUser
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserPassword = async (userInfo) => {
  try {
    const { data } = await axios.put(`${apiUrl}/users/resetPassword`, userInfo);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserContact = async (userId, normalizedUser) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/users/address/${userId}`,
      normalizedUser
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserKpoints = async (userId, kPoints) => {
  try {
    const { data } = await axios.put(`${apiUrl}/users/kPoints/${userId}`, {
      kPoints,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const followUser = async (userId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/users/follow/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/users`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeUserBlock = async (userId, isBlock) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/users/${userId}`, {
      isBlock,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

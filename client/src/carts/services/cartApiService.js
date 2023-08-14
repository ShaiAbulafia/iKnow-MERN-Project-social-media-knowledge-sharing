import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getCart = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/carts`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCart = async (productId, amount) => {
  try {
    const { data } = await axios.post(`${apiUrl}/carts`, { productId, amount });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeCartAmount = async (productId, amount) => {
  try {
    const { data } = await axios.put(`${apiUrl}/carts`, { productId, amount });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeFromCart = async (productId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/carts`, { productId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const emptyCart = async () => {
  try {
    const { data } = await axios.delete(`${apiUrl}/carts`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

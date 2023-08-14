import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/products`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createProduct = async (normalizedProduct) => {
  try {
    const { data } = await axios.post(`${apiUrl}/products`, normalizedProduct);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editProduct = async (productId, product) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/products/${productId}`,
      product
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changeWishStatus = async (productId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/products/${productId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

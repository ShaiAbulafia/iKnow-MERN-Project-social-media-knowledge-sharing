import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getOrders = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/orders`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/orders/allOrders`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrder = async (orderId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/orders/${orderId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addOrder = async (products, totalPrice, useKPoints) => {
  try {
    const { data } = await axios.post(`${apiUrl}/orders`, {
      products,
      totalPrice,
      useKPoints,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeOrderStatus = async (orderId, orderStatus) => {
  try {
    const { data } = await axios.post(`${apiUrl}/orders/${orderId}`, {
      orderStatus,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

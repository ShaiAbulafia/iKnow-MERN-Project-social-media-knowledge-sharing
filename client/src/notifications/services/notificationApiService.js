import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getNotifications = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/notifications`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNewNotifications = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/notifications/new`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeReadNotif = async (notificationsList) => {
  try {
    const { data } = await axios.put(`${apiUrl}/notifications`, {
      notificationsList,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getContacts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/contacts`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getContact = async (contactId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/contacts/${contactId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const setContactRead = async (contactId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/contacts/${contactId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createContact = async (contact) => {
  try {
    const { data } = await axios.post(`${apiUrl}/contacts`, contact);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

import jwtDecode from "jwt-decode";
const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken) => {
  return localStorage.setItem(TOKEN, encryptedToken);
};

export const getUser = () => {
  try {
    const user = localStorage.getItem(TOKEN);
    return jwtDecode(user);
  } catch {
    return null;
  }
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

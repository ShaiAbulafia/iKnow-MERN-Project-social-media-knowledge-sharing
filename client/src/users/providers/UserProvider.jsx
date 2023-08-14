import React, { useState, useContext, useEffect, useMemo } from "react";
import { node } from "prop-types";
import { getToken, getUser } from "../services/localStorageService";
import { getDisplayUser } from "../services/userApiService";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken);
  const [kPoints, setKPoints] = useState(null);

  useEffect(() => {
    if (!user) {
      const userFromLocaleStorage = getUser();
      setUser(userFromLocaleStorage);
    }
    if (user) {
      getDisplayUser(user._id)
        .then((data) => {
          setKPoints(data.kPoints);
        })
        .catch();
    }
  }, [kPoints, user]);

  const value = useMemo(() => {
    return { user, setUser, token, setToken, kPoints, setKPoints };
  }, [user, token, kPoints]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

UserProvider.propTypes = {
  children: node.isRequired,
};

import React, { useState, useContext, useEffect, useMemo } from "react";
import { node } from "prop-types";
import { getCart } from "../services/cartApiService";
import { useUser } from "../../users/providers/UserProvider";

const CartContext = React.createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [curCart, setCurCart] = useState(null);

  useEffect(() => {
    if (user && !curCart) {
      getCart().then((data) => setCurCart(data));
    }
    if (!user) {
      setCurCart(null);
    }
  }, [curCart, user]);

  const value = useMemo(() => {
    return { curCart, setCurCart };
  }, [curCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useUser must be used within a CartProvider");
  return context;
};

CartProvider.propTypes = {
  children: node.isRequired,
};

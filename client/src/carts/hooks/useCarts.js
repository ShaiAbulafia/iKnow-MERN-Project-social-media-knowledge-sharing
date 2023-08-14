import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import {
  emptyCart,
  getCart,
  removeFromCart,
  updateCart,
  changeCartAmount,
} from "../services/cartApiService";
import { useSnack } from "../../providers/SnackbarProvider";
import { getProduct } from "../../products/services/productApiService";
import { useCart } from "../providers/CartProvider";

const useCarts = () => {
  const { setCurCart } = useCart();
  const [cart, setCart] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [fullProductList, setfullProductList] = useState([]);

  useAxios();
  const snack = useSnack();

  const requestStatus = useCallback((loading, errorMessages, cart) => {
    setLoading(loading);
    setError(errorMessages);
    setCart(cart);
    setCurCart(cart);
  }, []);

  const handleGetCart = useCallback(async () => {
    try {
      setLoading(true);
      const cart = await getCart();
      requestStatus(false, null, cart);
      return cart;
    } catch (error) {
      requestStatus(false, error.message, cart);
    }
  }, [cart, requestStatus, snack]);

  const handleGetCartProducts = useCallback(async () => {
    try {
      setLoading(true);
      const cart = await handleGetCart();
      setfullProductList([]);
      for (let cartProduct in cart.products) {
        await getProduct(cart.products[cartProduct].productId).then((data) => {
          setfullProductList((oldArray) => [
            ...oldArray,
            { product: data, amount: cart.products[cartProduct].amount },
          ]);
        });
      }

      requestStatus(false, null, cart);
      return fullProductList;
    } catch (error) {
      requestStatus(false, error.message, cart);
    }
  }, [cart, fullProductList, handleGetCart, requestStatus]);

  const handleGetTotalPrice = useCallback((products) => {
    let totalPrice = 0;
    for (let index in products) {
      totalPrice += products[index].amount * products[index].product.price;
    }
    return totalPrice;
  }, []);

  const handleUpdateCart = useCallback(
    async (productId, amount) => {
      try {
        setLoading(true);
        const cart = await updateCart(productId, amount);
        requestStatus(false, null, cart);
        return cart;
      } catch (error) {
        requestStatus(false, error.message, cart);
      }
    },
    [cart, requestStatus]
  );

  const handleChangeAmounts = useCallback(
    async (productId, amount) => {
      try {
        setLoading(true);
        const cart = await changeCartAmount(productId, amount);
        requestStatus(false, null, cart);
        snack("success", "Added to cart!");
        return cart;
      } catch (error) {
        requestStatus(false, error.message, cart);
      }
    },
    [cart, requestStatus, snack]
  );

  const handleEmptyCart = useCallback(async () => {
    try {
      setLoading(true);
      await emptyCart();
      await handleGetCart();
      snack("success", "Cart is empty");
    } catch (error) {
      requestStatus(false, error.message, cart);
    }
  }, [cart, handleGetCart, requestStatus, snack]);

  const handleRemoveFromCart = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        await removeFromCart(productId);
        snack("success", "Changed user status");
        handleGetCart();
      } catch (error) {
        requestStatus(false, error.message, cart);
      }
    },
    [cart, handleGetCart, requestStatus, snack]
  );

  const value = useMemo(() => {
    return {
      isLoading,
      error,
      cart,
      fullProductList,
    };
  }, [isLoading, error, cart, fullProductList]);

  return {
    value,
    handleGetCart,
    handleUpdateCart,
    handleEmptyCart,
    handleRemoveFromCart,
    handleGetCartProducts,
    handleChangeAmounts,
    handleGetTotalPrice,
  };
};

export default useCarts;

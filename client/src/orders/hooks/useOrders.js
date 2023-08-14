import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import {
  getOrders,
  getOrder,
  addOrder,
  getAllOrders,
} from "../services/ordersApiService";
import { useSnack } from "../../providers/SnackbarProvider";
import { useUser } from "../../users/providers/UserProvider";
import { getDisplayUser } from "../../users/services/userApiService";
import { useSearchParams } from "react-router-dom";

const useOrders = () => {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { setKPoints, user } = useUser();
  useAxios();
  const snack = useSnack();
  const [statusQuery, setStatusQuery] = useState("");
  const [numQuery, setNumQuery] = useState("");
  const [filteredOrders, setFilter] = useState(null);
  const [searchParamas] = useSearchParams();

  useEffect(() => {
    setStatusQuery(searchParamas.get("o") ?? "");
    setNumQuery(searchParamas.get("on") ?? "");
  }, [searchParamas]);

  useEffect(() => {
    if (orders) {
      if (statusQuery === "All") {
        setFilter(orders);
        return;
      }
      if (statusQuery === "Active") {
        setFilter(
          orders.filter(
            (order) =>
              !order.status.includes("Delivered") &&
              !order.status.includes("Canceled")
          )
        );
        return;
      }
      if (statusQuery !== "") {
        setFilter(orders.filter((order) => order.status.includes(statusQuery)));
        return;
      }
      if (numQuery !== "") {
        setFilter(
          orders.filter((order) =>
            order.orderNumber.toString().includes(numQuery)
          )
        );
        return;
      }
      setFilter(
        orders.filter(
          (order) =>
            !order.status.includes("Delivered") &&
            !order.status.includes("Canceled")
        )
      );
    }
  }, [numQuery, orders, statusQuery]);

  const requestStatus = useCallback(
    (loading, errorMessages, orders, order = null) => {
      setLoading(loading);
      setError(errorMessages);
      setOrders(orders);
      setOrder(order);
    },
    []
  );

  const handleGetOrder = useCallback(
    async (orderId) => {
      try {
        setLoading(true);
        const order = await getOrder(orderId);
        requestStatus(false, null, orders, order);
        return order;
      } catch (error) {
        snack("error", error.message);
        requestStatus(false, error.message, orders);
      }
    },
    [orders, requestStatus, snack]
  );

  const handleGetOrders = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getOrders();
      requestStatus(false, null, orders);
      return orders;
    } catch (error) {
      requestStatus(false, error.message, orders);
    }
  }, [orders, requestStatus]);

  const handleGetAllOrders = useCallback(async () => {
    try {
      setLoading(true);
      const orders = await getAllOrders();
      requestStatus(false, null, orders);
      return orders;
    } catch (error) {
      requestStatus(false, error.message, orders);
    }
  }, [orders, requestStatus]);

  const handleAddOrder = useCallback(
    async (products, totalPrice, useKPoints) => {
      try {
        setLoading(true);
        const order = await addOrder(products, totalPrice, useKPoints);
        await getDisplayUser(user._id).then((data) => setKPoints(data.kPoints));
        requestStatus(false, null, orders, order);
        snack("success", "Order sent!");
        return order;
      } catch (error) {
        requestStatus(false, error.message, orders);
      }
    },
    [orders, requestStatus, setKPoints, snack]
  );

  const valueOrder = useMemo(() => {
    return {
      isLoading,
      error,
      orders,
      order,
      filteredOrders,
    };
  }, [isLoading, error, orders, order, filteredOrders]);

  return {
    valueOrder,
    handleGetOrder,
    handleGetOrders,
    handleAddOrder,
    handleGetAllOrders,
  };
};

export default useOrders;

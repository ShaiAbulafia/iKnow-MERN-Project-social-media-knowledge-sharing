import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import OrdersFeedback from "../components/OrdersFeedback";
import useOrders from "../hooks/useOrders";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box } from "@mui/material";

const OrdersPage = () => {
  const { valueOrder, handleGetOrders } = useOrders();
  const { user } = useUser();

  useEffect(() => {
    if (user) handleGetOrders();
  }, [user]);

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />;
  return (
    <Box pt={10}>
      <OrdersFeedback
        isLoading={valueOrder.isLoading}
        error={valueOrder.error}
        orders={valueOrder.orders}
      />
    </Box>
  );
};

export default OrdersPage;

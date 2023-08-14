import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import OrderFeedback from "../components/OrderFeedback";
import useOrders from "../hooks/useOrders";
import { useParams } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box } from "@mui/material";

const OrdersPage = () => {
  const { valueOrder, handleGetOrder } = useOrders();
  const { user } = useUser();
  const { id } = useParams();
  useEffect(() => {
    if (user) handleGetOrder(id);
  }, [user]);

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />;

  return (
    <Box pt={6}>
      <OrderFeedback
        isLoading={valueOrder.isLoading}
        error={valueOrder.error}
        order={valueOrder.order}
      />
    </Box>
  );
};

export default OrdersPage;

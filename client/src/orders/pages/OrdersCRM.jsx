import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import OrdersCrmFeedback from "../components/OrdersCrmFeedback";
import useOrders from "../hooks/useOrders";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box } from "@mui/material";

const OrdersCRM = () => {
  const { valueOrder, handleGetAllOrders } = useOrders();
  const { user } = useUser();
  useEffect(() => {
    if (user) handleGetAllOrders();
  }, [user]);

  if (user && !user.isAdmin) return <Navigate replace to={ROUTES.POSTS} />;
  return (
    <Box pt={10}>
      <OrdersCrmFeedback
        isLoading={valueOrder.isLoading}
        error={valueOrder.error}
        orders={valueOrder.filteredOrders}
      />
    </Box>
  );
};

export default OrdersCRM;

import React from "react";
import { Typography, Box } from "@mui/material";
import orderType from "../models/types/orderType";
import { makeFirstLetterCapital } from "../../utils/algoMethods";

const OrderDetails = ({ order }) => {
  const statusColorTable = {
    new_order: "primary",
    in_process: "warning",
    on_delivery: "secondary",
    delivered: "success",
    canceled: "error",
  };

  return (
    <Box mx={1} my={2}>
      <Box my={2}>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          Order no.{" "}
          <Typography component="span" variant="h5" color="text.secondary">
            {order.orderNumber}
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          Status:{" "}
          <Typography
            component="span"
            variant="h5"
            color={`${
              statusColorTable[
                String(order.status).toLowerCase().replace(" ", "_")
              ]
            }.main`}
          >
            {order.status}
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          Cart total price:{" "}
          <Typography
            component="span"
            variant="h5"
            color="success.main"
            fontWeight={700}
          >
            {order.totalPrice}$
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          K-Points used:{" "}
          <Typography
            component="span"
            variant="h5"
            color="primary"
            fontWeight={700}
          >
            {order.kPointsUsed}
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          Payment:{" "}
          <Typography
            component="span"
            variant="h5"
            color="success.main"
            fontWeight={700}
          >
            {order.totalPrice - order.kPointsUsed / 100}$
          </Typography>
        </Typography>
      </Box>
      <Box>
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          color="text.secondary"
        >
          Delivery to:{" "}
          <Typography component="span" variant="h5" color="text.secondary">
            {makeFirstLetterCapital(order.orderAddress.state)},{" "}
            {makeFirstLetterCapital(order.orderAddress.country)},{" "}
            {makeFirstLetterCapital(order.orderAddress.city)},{" "}
            {makeFirstLetterCapital(order.orderAddress.street)}, house no.
            {order.orderAddress.houseNumber} | Zip: {order.orderAddress.zip}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

OrderDetails.propTypes = {
  order: orderType.isRequired,
};

export default OrderDetails;

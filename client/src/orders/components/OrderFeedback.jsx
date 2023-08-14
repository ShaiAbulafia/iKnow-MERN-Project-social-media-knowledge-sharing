import React from "react";
import { string, bool } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Table from "./orderTable/Table";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import orderType from "../models/types/orderType";
import OrderDetails from "./OrderDetails";
import { useTheme } from "../../providers/ThemeProvider";

const OrderFeedback = ({ isLoading, error, order }) => {
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!order)
    return (
      <Paper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          padding: 50,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Oops.. cant find the order in database!
        </Typography>
      </Paper>
    );
  if (order)
    return (
      <>
        <Table products={order.products} />
        <Paper
          elevation={3}
          sx={{
            my: 3,
            p: 3,
            border: 3,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
        >
          <OrderDetails order={order} />
        </Paper>
      </>
    );
  return null;
};

OrderFeedback.propTypes = {
  order: orderType,
  isLoading: bool.isRequired,
  error: string,
};

export default OrderFeedback;

import React from "react";
import { string, bool, arrayOf } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Table from "./ordersTable/Table";
import Typography from "@mui/material/Typography";
import orderType from "../models/types/orderType";
import { Paper } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";

const OrdersFeedback = ({ isLoading, error, orders }) => {
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (orders && !orders.length)
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
          Oops.. there are no orders. Go to store to purchase!
        </Typography>
      </Paper>
    );
  if (orders)
    return (
      <Table
        orders={orders.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        })}
      />
    );
  return null;
};

OrdersFeedback.propTypes = {
  orders: arrayOf(orderType),
  isLoading: bool.isRequired,
  error: string,
};

export default OrdersFeedback;

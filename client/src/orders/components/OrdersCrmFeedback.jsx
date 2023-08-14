import React from "react";
import { string, bool, arrayOf } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Table from "./ordersTable/Table";
import Typography from "@mui/material/Typography";
import orderType from "../models/types/orderType";
import { Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import CrmMenu from "./CrmMenu";
import { useUser } from "../../users/providers/UserProvider";

const OrdersCrmFeedback = ({ isLoading, error, orders }) => {
  const { user } = useUser();
  const { isDark } = useTheme();
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (orders && !orders.length)
    return (
      <>
        {user && user.isAdmin && <CrmMenu ordersCount={0} />}
        <Paper
          sx={{
            mt: 3,
            border: 2,
            borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
            backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          }}
          style={{
            padding: 50,
          }}
        >
          <Typography variant="h5" textAlign="center">
            No orders that match the parameters.
          </Typography>
        </Paper>
      </>
    );
  if (orders)
    return (
      <>
        {!!user.isAdmin && <CrmMenu ordersCount={orders.length} />}
        <Table orders={orders} />
      </>
    );
  return null;
};

OrdersCrmFeedback.propTypes = {
  orders: arrayOf(orderType),
  isLoading: bool.isRequired,
  error: string,
};

export default OrdersCrmFeedback;

import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import orderType from "../../models/types/orderType";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "../../../users/providers/UserProvider";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ChangeOrderDialog from "./ChangeOrderDialog";
import { changeOrderStatus } from "../../services/ordersApiService";
import PersonIcon from "@mui/icons-material/Person";

const TableRow = ({ order }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const date = new Date(order.createdAt);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [isDialogOpen, setDialog] = useState(false);
  const handleDialog = (term) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };

  const handleChangeStatus = (chosenStatus) => {
    handleDialog();
    changeOrderStatus(order._id, chosenStatus).then(() => {
      setOrderStatus(chosenStatus);
    });
  };

  const statusColorTable = {
    new_order: "primary",
    in_process: "warning",
    on_delivery: "secondary",
    delivered: "success",
    canceled: "error",
  };

  return (
    <>
      <MuiTableRow>
        <TableCell align="center">{order.orderNumber}</TableCell>
        <TableCell align="center">{date.toLocaleDateString()}</TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            color={`${
              statusColorTable[
                String(orderStatus).toLowerCase().replace(" ", "_")
              ]
            }.main`}
          >
            {orderStatus}
          </Typography>
        </TableCell>
        {user && !user.isAdmin && (
          <TableCell align="center">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Tooltip title="Watch cart">
                  <IconButton
                    aria-label="Watch cart"
                    onClick={() => navigate(`${ROUTES.ORDERS}/${order._id}`)}
                  >
                    <ShoppingCartIcon fontSize="large" color="primary" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </TableCell>
        )}
        {user && user.isAdmin && (
          <TableCell align="center">
            <Box display="flex" justifyContent="space-around">
              <Tooltip title="Watch cart">
                <IconButton
                  aria-label="Watch cart"
                  onClick={() => navigate(`${ROUTES.ORDERS}/${order._id}`)}
                >
                  <ShoppingCartIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Change status">
                <IconButton
                  aria-label="Change status"
                  onClick={() => handleDialog("open")}
                >
                  <PublishedWithChangesIcon color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage user">
                <IconButton
                  aria-label="Manage user"
                  onClick={() =>
                    navigate(`${ROUTES.ADMIN}/users?u=${order.userId}`)
                  }
                >
                  <PersonIcon color="warning" />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        )}
      </MuiTableRow>
      <ChangeOrderDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        changeStatus={handleChangeStatus}
        orderNum={order.orderNumber}
        status={orderStatus}
      />
    </>
  );
};

TableRow.propTypes = {
  order: orderType.isRequired,
};

export default TableRow;

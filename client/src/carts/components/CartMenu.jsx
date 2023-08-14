import React, { useState, useEffect } from "react";
import { func, number, arrayOf, bool } from "prop-types";
import { Grid, Button } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DialogEmpty from "./DialogEmpty";
import DialogPayment from "./DialogPayment";
import fullProductsList from "../../carts/models/types/fullProductsList";
import useOrders from "../../orders/hooks/useOrders";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";

const CartMenu = ({ onEmpty, totalPrice, products, orderReady, useKP }) => {
  const [isDialogOpenEmpty, setDialogEmpty] = useState(false);
  const [isDialogOpenPay, setDialogPay] = useState(false);
  const { handleAddOrder } = useOrders();
  const navigate = useNavigate();
  const { user, kPoints } = useUser();
  const [payment, setPayment] = useState(totalPrice);

  useEffect(() => {
    if (!useKP) {
      setPayment(totalPrice);
    }
    if (user && useKP) {
      setPayment(totalPrice - Math.floor(kPoints / 100));
      if (totalPrice * 100 <= kPoints) {
        setPayment(0);
      }
    }
  }, [totalPrice, useKP, user, kPoints]);

  const handleDialogEmpty = (term) => {
    if (term === "open") return setDialogEmpty(true);
    setDialogEmpty(false);
  };

  const handleDialogPayment = (term) => {
    if (term === "open") return setDialogPay(true);
    setDialogPay(false);
  };

  const handleEmpty = async () => {
    handleDialogEmpty();
    await onEmpty();
  };

  const handleAdd = async () => {
    handleDialogPayment();
    await handleAddOrder(products, totalPrice, useKP);
    await onEmpty();
    navigate(ROUTES.ORDERS);
  };

  return (
    <>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={4} md={2}>
          <Button
            aria-label="purchase"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!orderReady}
            onClick={() => handleDialogPayment("open")}
          >
            <ShoppingCartCheckoutIcon fontSize="large" color="whiteColor" />
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            aria-label="Empty cart"
            variant="contained"
            color="error"
            fullWidth
            onClick={() => handleDialogEmpty("open")}
          >
            <RemoveShoppingCartIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>

      <DialogEmpty
        isDialogOpen={isDialogOpenEmpty}
        onChangeDialog={handleDialogEmpty}
        onEmpty={handleEmpty}
      />

      <DialogPayment
        isDialogOpen={isDialogOpenPay}
        onChangeDialog={handleDialogPayment}
        onAdd={handleAdd}
        payment={payment}
      />
    </>
  );
};

CartMenu.propTypes = {
  products: arrayOf(fullProductsList).isRequired,
  onEmpty: func.isRequired,
  totalPrice: number.isRequired,
  orderReady: bool.isRequired,
  useKP: bool.isRequired,
};

export default CartMenu;

import React from "react";
import { func, bool, number } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const DialogPayment = ({ isDialogOpen, onChangeDialog, onAdd, payment }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Payment"}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          This is not a real store, you wont receive any products as the payment
          is in theory. This operation will place a fake order in data base.
        </DialogContentText>
        <DialogContentText id="alert-dialog-bill" m={2} textAlign="center">
          <Typography variant="h5" component="span">
            Your payment:{" "}
            <Typography variant="h5" component="span" color="success.main">
              {payment}$
            </Typography>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onAdd} autoFocus color="primary">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogPayment.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onAdd: func.isRequired,
  payment: number.isRequired,
};
export default DialogPayment;

import React from "react";
import { func, bool } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DialogRemove = ({ isDialogOpen, onEmpty, onChangeDialog }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Empty Cart"}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          This operation will empty your cart
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onEmpty} autoFocus color="primary">
          Empty Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogRemove.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onEmpty: func.isRequired,
};
export default DialogRemove;

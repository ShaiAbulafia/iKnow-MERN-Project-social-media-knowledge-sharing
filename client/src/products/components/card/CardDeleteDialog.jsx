import React from "react";
import { func, bool } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CardDeleteDialog = ({ isDialogOpen, onDelete, onChangeDialog }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this card?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation will completely delete the product and all its data
          from the database and it will not be possible to retrieve the product
          afterwards.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onDelete} autoFocus color="primary">
          Delete card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CardDeleteDialog.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onDelete: func.isRequired,
};

export default CardDeleteDialog;

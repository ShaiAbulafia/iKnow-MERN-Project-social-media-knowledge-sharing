import React from "react";
import { func, bool } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DialogRemove = ({ isDialogOpen, onRemove, onChangeDialog }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Remove section"}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          This operation will remove the content in the last section
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onRemove} autoFocus color="primary">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogRemove.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onRemove: func.isRequired,
};
export default DialogRemove;

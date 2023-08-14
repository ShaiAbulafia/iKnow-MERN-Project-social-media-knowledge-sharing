import React from "react";
import { func, bool } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DialogRemove = ({ isDialogOpen, onDelete, onChangeDialog }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Delete comment"}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          This operation will completely delete the comment and all its data
          from the database and it will not be possible to retrieve the comment
          afterwards.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onDelete} autoFocus color="primary">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogRemove.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onDelete: func.isRequired,
};
export default DialogRemove;

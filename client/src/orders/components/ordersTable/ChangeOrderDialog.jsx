import React, { useState } from "react";
import { func, bool, number, string } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";

const ChangeOrderDialog = ({
  isDialogOpen,
  onChangeDialog,
  changeStatus,
  orderNum,
  status,
}) => {
  const [chosenStatus, setChosen] = useState(status);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Change order ${orderNum} status`}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description" component="div">
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={chosenStatus === "New order"}
                sx={{ mx: 1 }}
                onClick={() => setChosen("New order")}
              >
                <Typography variant="body1" component="span">
                  New Order
                </Typography>
              </Button>
            </Grid>{" "}
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={chosenStatus === "In process"}
                sx={{ mx: 1 }}
                onClick={() => setChosen("In process")}
              >
                <Typography variant="body1" component="span">
                  In process
                </Typography>
              </Button>
            </Grid>{" "}
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={chosenStatus === "On delivery"}
                sx={{ mx: 1 }}
                onClick={() => setChosen("On delivery")}
              >
                <Typography variant="body1" component="span">
                  On delivery
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={chosenStatus === "Delivered"}
                sx={{ mx: 1 }}
                onClick={() => setChosen("Delivered")}
              >
                <Typography variant="body1" component="span">
                  Delivered
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                disabled={chosenStatus === "Canceled"}
                sx={{ mx: 1 }}
                onClick={() => setChosen("Canceled")}
              >
                <Typography variant="body1" component="span">
                  Cancel order and refund
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => {
            changeStatus(chosenStatus);
          }}
          autoFocus
          color="primary"
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ChangeOrderDialog.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  changeStatus: func.isRequired,
  orderNum: number.isRequired,
  status: string.isRequired,
};
export default ChangeOrderDialog;

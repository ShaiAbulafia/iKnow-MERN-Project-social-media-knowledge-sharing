import React from "react";
import { func, bool, number } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, Typography, TextField, Grid } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";

const DialogUpdate = ({
  isDialogOpen,
  onUpdate,
  onChangeDialog,
  setQuant,
  stock,
  amount,
}) => {
  const { isDark } = useTheme();

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Change Quantity"}</DialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent="center" alignItems="center">
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.secondary"
            component="span"
            mx={1}
          >
            Qt:{" "}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            defaultValue={amount.toString()}
            color={isDark ? "darkModeButton" : "mainColor"}
            sx={{
              backgroundColor: isDark ? "darkModeColor.main" : "#fff",
              borderRadius: 1,
            }}
            InputProps={{ inputProps: { min: 1, max: stock } }}
            onChange={(e) => setQuant(e.target.valueAsNumber)}
          />
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        <Button onClick={onUpdate} autoFocus color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogUpdate.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onUpdate: func.isRequired,
  setQuant: func.isRequired,
  stock: number.isRequired,
  amount: number.isRequired,
};
export default DialogUpdate;

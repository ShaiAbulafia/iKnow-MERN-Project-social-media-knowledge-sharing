import React, { useState } from "react";
import { func, bool } from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";

const UserGiftDialog = ({ isDialogOpen, onGift, onChangeDialog }) => {
  const { isDark } = useTheme();
  const [chosenKpoints, setChosenKP] = useState(0);
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"Give or take K-Points"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent="center" alignItems="center">
          <Typography
            variant="h5"
            color="text.secondary"
            component="span"
            mx={1}
          >
            K-Points:{" "}
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            defaultValue={0}
            color={isDark ? "darkModeButton" : "mainColor"}
            sx={{
              backgroundColor: isDark ? "darkModeColor.main" : "#fff",
              borderRadius: 1,
            }}
            onChange={(e) => setChosenKP(e.target.valueAsNumber)}
          />
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={onChangeDialog} color="error">
          Cancel
        </Button>
        {chosenKpoints >= 0 && (
          <Button
            onClick={() => onGift(chosenKpoints)}
            autoFocus
            color="success"
          >
            Give
          </Button>
        )}
        {chosenKpoints < 0 && (
          <Button
            onClick={() => onGift(chosenKpoints)}
            autoFocus
            color="warning"
          >
            Take
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

UserGiftDialog.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onGift: func.isRequired,
};
export default UserGiftDialog;

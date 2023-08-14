import React, { useState, useContext, useCallback } from "react";
import { node } from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarContext = React.createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("in snackbar!");
  const [snackColor, setSnackColor] = useState("success");
  const [snackVariant, setSnackVariant] = useState("filled");

  const setSnack = useCallback(
    (color, message, variant = "filled") => {
      setOpenSnack(true);
      setSnackColor(color);
      setSnackMessage(message);
      setSnackVariant(variant);
    },
    [setOpenSnack, setSnackColor, setSnackMessage, setSnackVariant]
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackOpen}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={4000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnack must be used within a SnackbarProvider");
  return context;
};

SnackbarProvider.propTypes = {
  children: node.isRequired,
};

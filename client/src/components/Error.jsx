import React from "react";
import { string } from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider, Paper } from "@mui/material";
import { useTheme } from "../providers/ThemeProvider";

const Error = ({ errorMessage }) => {
  const { isDark } = useTheme();
  return (
    <>
      <Paper
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
        style={{
          padding: 50,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" color="text.secondary">
              Oops... something went wrong
            </Typography>
            <Divider />
            <Typography variant="h5" mt={5}>
              {errorMessage}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} justifyContent="center">
            <img
              width="100%"
              src="/assets/images/broken-robot-error.png"
              alt="broken robot"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

Error.propTypes = {
  errorMessage: string.isRequired,
};

export default Error;

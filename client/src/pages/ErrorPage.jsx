import React from "react";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../routes/routesModel";
import { Divider } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} pt={6}>
        <Grid item xs={12}>
          <Typography variant="h2" color="text.secondary">
            #404 Page not found
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="text.secondary">
            Oops... The requested URL was not found on this server
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(ROUTES.ROOT)}
          >
            Click here to return to the home page...
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            width="100%"
            src="/assets/images/broken-robot.png"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorPage;

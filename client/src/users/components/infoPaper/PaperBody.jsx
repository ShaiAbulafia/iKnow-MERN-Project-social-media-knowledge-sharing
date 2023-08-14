import React from "react";
import viewUserType from "../../models/types/viewUserType";
import { Grid, Divider, Stack, Typography, Paper } from "@mui/material";
import { makeFirstLetterCapital } from "../../../utils/algoMethods";
import { useTheme } from "../../../providers/ThemeProvider";

const PaperBody = ({ userObj }) => {
  const date = new Date(userObj.createdAt);
  const { isDark } = useTheme();

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          px: 5,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={700} variant="h4" color="text.secondary">
              Name
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                First:{" "}
              </Typography>
              {userObj.name.first}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                middle:{" "}
              </Typography>
              {userObj.name.middle}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                Last:{" "}
              </Typography>
              {userObj.name.last}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={700} variant="h4" color="text.secondary">
              Address
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                State:{" "}
              </Typography>
              {userObj.address.state !== "" &&
                makeFirstLetterCapital(userObj.address.state)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                Country:{" "}
              </Typography>
              {userObj.address.country !== "" &&
                makeFirstLetterCapital(userObj.address.country)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                City:{" "}
              </Typography>
              {userObj.address.city !== "" &&
                makeFirstLetterCapital(userObj.address.city)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                Street:{" "}
              </Typography>
              {userObj.address.street !== "" &&
                makeFirstLetterCapital(userObj.address.street)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                House no.:{" "}
              </Typography>
              {userObj.address.houseNumber > 0 && userObj.address.houseNumber}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                Zip:{" "}
              </Typography>
              {userObj.address.zip > 0 && userObj.address.zip}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" color="text.secondary">
              <Typography variant="h5" fontWeight={700} component="span">
                Created at:{" "}
              </Typography>
              {date.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

PaperBody.propTypes = {
  userObj: viewUserType.isRequired,
};

export default PaperBody;

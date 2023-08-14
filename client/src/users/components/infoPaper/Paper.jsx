import React from "react";
import viewUserType from "../../models/types/viewUserType";
import { Grid } from "@mui/material";
import PaperBody from "./PaperBody";
import PaperImage from "./PaperImage";

const Paper = ({ user }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PaperImage user={user} />
      </Grid>
      <Grid item xs={12}>
        <PaperBody userObj={user} />
      </Grid>
    </Grid>
  );
};

Paper.propTypes = {
  user: viewUserType.isRequired,
};

export default Paper;

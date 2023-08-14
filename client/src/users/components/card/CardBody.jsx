import React from "react";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import viewUserType from "../../models/types/viewUserType";
import CardHeader from "@mui/material/CardHeader";
import { makeEveryFirstLetterCapital } from "../../../utils/algoMethods";

const CardBody = ({ user }) => {
  let fullName = `${user.name.first} ${user.name.middle} ${user.name.last}`;
  if (!user.name.middle) {
    fullName = `${user.name.first} ${user.name.last}`;
  }
  fullName = makeEveryFirstLetterCapital(fullName);

  return (
    <>
      <CardContent>
        <CardHeader
          sx={{ p: 0, m: 0 }}
          title={
            <Typography
              variant="h5"
              align="center"
              color={"text.secondary"}
              fontWeight={700}
            >
              {fullName}
            </Typography>
          }
          subheader={
            <Typography
              variant="body1"
              align="center"
              color={"text.secondary"}
              fontWeight={600}
            >
              {user.follows.length} followers
            </Typography>
          }
        />
      </CardContent>
    </>
  );
};
CardBody.propTypes = {
  user: viewUserType.isRequired,
};

export default CardBody;

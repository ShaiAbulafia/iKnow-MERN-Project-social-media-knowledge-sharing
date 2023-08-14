import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

import userDisplayType from "../../../posts/models/types/userDisplayType";
import { makeFirstLetterCapital } from "../../../utils/algoMethods";

const UserDisplay = ({ userDisplay }) => {
  const fullName = () => {
    if (userDisplay.name.middle === "")
      return `${makeFirstLetterCapital(
        userDisplay.name.first
      )} ${makeFirstLetterCapital(userDisplay.name.last)}`;
    return `${makeFirstLetterCapital(userDisplay.name.first)}
      ${makeFirstLetterCapital(userDisplay.name.middle)} 
      ${makeFirstLetterCapital(userDisplay.name.last)}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt={userDisplay.image.alt}
        src={userDisplay.image.url}
        sx={{
          mb: 1,
        }}
      />
      <Typography variant="body1" color="text.secondary">
        {fullName()}
      </Typography>
    </Box>
  );
};

UserDisplay.propTypes = {
  userDisplay: userDisplayType.isRequired,
};

export default UserDisplay;

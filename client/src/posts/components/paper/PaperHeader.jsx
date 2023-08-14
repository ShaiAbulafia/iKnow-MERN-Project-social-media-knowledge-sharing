import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  makeEveryFirstLetterCapital,
  makeFirstLetterCapital,
} from "../../../utils/algoMethods";
import Divider from "@mui/material/Divider";
import { string } from "prop-types";
import userDisplayType from "../../models/types/userDisplayType";
import ROUTES from "../../../routes/routesModel";
import { Link } from "react-router-dom";
import ForwardIcon from "@mui/icons-material/Forward";

const PaperHeader = ({ title, subtitle, userDisplay, postDate }) => {
  const date = new Date(postDate);
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
    <>
      <Typography
        variant="h3"
        align="center"
        color="text.main"
        sx={{ fontWeight: 900 }}
      >
        {makeEveryFirstLetterCapital(title)}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paddingTop={2}
        sx={{ fontWeight: 900 }}
      >
        {makeFirstLetterCapital(subtitle)}
      </Typography>
      <Divider sx={{ mt: 3, mb: 1 }} />

      <Typography
        variant="body1"
        align="center"
        fontWeight={700}
        color="text.secondary"
      >
        {date.toLocaleString()}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        marginY={1}
        fontWeight={700}
      >
        Posted By
      </Typography>
      <Box sx={{ textAlign: "center", my: 1 }}>
        <Avatar
          alt={userDisplay.image.alt}
          src={userDisplay.image.url}
          sx={{ display: "inline-block" }}
        />

        <Link
          to={`${ROUTES.USER_PROFILE}/view/${userDisplay._id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            color="primary"
            marginY={1}
            fontWeight={700}
          >
            {fullName()}
          </Typography>
          <Box display="flex" justifyContent="center">
            <ForwardIcon color="primary" />
            <Typography
              variant="body1"
              color="primary"
              marginBottom={1}
              fontWeight={700}
            >
              Profile Page
            </Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
};

PaperHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
  userDisplay: userDisplayType.isRequired,
  postDate: string.isRequired,
};

export default PaperHeader;

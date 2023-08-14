import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "../../../providers/ThemeProvider";
import postType from "../../models/types/postType";
import { Divider, Grid, Typography } from "@mui/material";
import { makeFirstLetterCapital } from "../../../utils/algoMethods";
import userDisplayType from "../../models/types/userDisplayType";

const CardBody = ({ post, userDisplay }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const date = new Date(post.createdAt);

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
    <CardActionArea
      onClick={() => navigate(`${ROUTES.POSTS}/${post._id}`)}
      sx={{
        backgroundColor: isDark ? "" : "thirdColor.main",
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center", p: 2 }}>
        <Grid item xs={1} md={1}>
          <Avatar
            alt={userDisplay.image.alt}
            src={userDisplay.image.url}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          />
        </Grid>
        <Grid item xs={10} md={5}>
          <Typography
            variant="h5"
            color="text.main"
            fontWeight={700}
            textAlign={{ xs: "center", md: "left" }}
          >
            {makeFirstLetterCapital(post.title)}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign={{ xs: "center", md: "left" }}
          >
            {makeFirstLetterCapital(post.subtitle)}
          </Typography>
          <Divider sx={{ my: 1, display: { md: "none" } }} />
        </Grid>
        <Grid item xs={4} md={2} textAlign="center">
          <Typography variant="body1" color="text.main" fontWeight={700}>
            Rate
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {Number(post.rate).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2} textAlign="center">
          <Typography variant="body1" color="text.main" fontWeight={700}>
            Date
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {date.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2} textAlign="center">
          <Typography variant="body1" color="text.main" fontWeight={700}>
            By
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {fullName()}
          </Typography>
        </Grid>
      </Grid>
    </CardActionArea>
  );
};

CardBody.propTypes = {
  post: postType.isRequired,
  userDisplay: userDisplayType.isRequired,
};

export default CardBody;

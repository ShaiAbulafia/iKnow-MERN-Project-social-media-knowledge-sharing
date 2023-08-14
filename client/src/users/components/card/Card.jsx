import React from "react";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardBody from "./CardBody";
import CardImage from "./CardImage";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import viewUserType from "../../models/types/viewUserType";
import { useTheme } from "../../../providers/ThemeProvider";
import { Box, Typography } from "@mui/material";
import { number } from "prop-types";

const Card = ({ user, place }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  return (
    <MuiCard
      elevation={3}
      sx={{
        minWidth: 280,
        border: 2,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderColor: isDark ? "darkModeColor.main" : "mainColor.main",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          py: 1,
          backgroundColor: isDark ? "darkModeColor.main" : "mainColor.main",
        }}
      >
        {place}
      </Typography>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.USER_PROFILE}/view/${user._id}`)}
      >
        <Box
          sx={{
            height: 100,
            backgroundColor: isDark ? "" : "#d3d3d3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: 2,
            borderColor: isDark ? "darkModeColor.main" : "mainColor.main",
          }}
        >
          <CardBody user={user} />
        </Box>
        <Box sx={{ height: 250 }}>
          <CardImage image={user.image} />
        </Box>
      </CardActionArea>
    </MuiCard>
  );
};

Card.propTypes = {
  user: viewUserType.isRequired,
  place: number.isRequired,
};

export default Card;

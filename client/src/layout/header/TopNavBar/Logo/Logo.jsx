import React from "react";
import IconButton from "@mui/material/IconButton";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "./../../../../routes/routesModel";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <NavBarLink to={ROUTES.ABOUT}>
      <IconButton
        sx={{ display: { xs: "none", md: "inline-flex" } }}
        edge="start"
        aria-label="menu"
      >
        <Avatar
          alt="iKnow logo"
          src="/assets/images/iKnowLogo.png"
          variant="square"
          sx={{ width: 50, height: 50 }}
        />
      </IconButton>
    </NavBarLink>
  );
};

export default Logo;

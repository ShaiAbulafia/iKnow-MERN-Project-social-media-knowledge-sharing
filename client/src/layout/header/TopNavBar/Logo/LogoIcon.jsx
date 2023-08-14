import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "./../../../../routes/routesModel";

const LogoIcon = () => {
  return (
    <NavBarLink to={ROUTES.ABOUT}>
      <IconButton
        sx={{ display: { xs: "inline-flex", md: "none" } }}
        size="large"
        edge="start"
        color="inherit"
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

export default LogoIcon;

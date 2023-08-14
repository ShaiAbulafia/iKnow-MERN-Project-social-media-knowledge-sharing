import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../../routes/components/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ marginLeft: 3, display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="home" to={ROUTES.ROOT} />
        <NavItem label="Posts" to={`${ROUTES.POSTS}/all_posts`} />
        <NavItem label="store" to={ROUTES.PRODUCTS} />
        {user && user.isAdmin && (
          <NavItem label="Admin" to={`${ROUTES.ADMIN}/users`} />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;

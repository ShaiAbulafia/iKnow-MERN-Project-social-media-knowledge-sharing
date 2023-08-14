import React from "react";
import { string } from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBarLink from "./NavBarLink";
import { useTheme } from "../../providers/ThemeProvider";

const NavItem = ({ label, to, color }) => {
  const { isDark } = useTheme();
  return (
    <NavBarLink to={to}>
      <Button color="inherit" sx={{ mx: 1.5 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color={isDark ? "white" : color}
        >
          {label.toUpperCase()}
        </Typography>
      </Button>
    </NavBarLink>
  );
};

NavItem.propTypes = {
  label: string.isRequired,
  to: string.isRequired,
  color: string,
};

export default NavItem;

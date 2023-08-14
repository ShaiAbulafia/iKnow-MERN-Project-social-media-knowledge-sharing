import React from "react";
import { string, func } from "prop-types";
import NavBarLink from "../../../../routes/components/NavBarLink";
import { makeFirstLetterCapital } from "./utils/algoMethods";
import MenuItem from "@mui/material/MenuItem";

const MenuLink = ({ navigateTo, onClick, label, styles, color }) => {
  return (
    <NavBarLink to={navigateTo} color={color}>
      <MenuItem onClick={onClick} sx={{ ...styles }}>
        {makeFirstLetterCapital(label)}
      </MenuItem>
    </NavBarLink>
  );
};

MenuLink.propTypes = {
  navigateTo: string.isRequired,
  onClick: func.isRequired,
  label: string.isRequired,
};

export default MenuLink;

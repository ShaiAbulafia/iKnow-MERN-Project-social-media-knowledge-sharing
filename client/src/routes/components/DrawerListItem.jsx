import React from "react";
import { string, func, bool } from "prop-types";
import ListItem from "@mui/material/ListItem";
import NavItem from "./NavItem";

const DrawerListItem = ({ label, navigateTo, onClose }) => {
  return (
    <ListItem
      divider={true}
      disablePadding
      onClick={onClose}
      sx={{ justifyContent: "center" }}
    >
      <NavItem label={label} to={navigateTo} color="white" />
    </ListItem>
  );
};

DrawerListItem.propTypes = {
  label: string.isRequired,
  navigateTo: string.isRequired,
  onClose: func.isRequired,
};

export default DrawerListItem;

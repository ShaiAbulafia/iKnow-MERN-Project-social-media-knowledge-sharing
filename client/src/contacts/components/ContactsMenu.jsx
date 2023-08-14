import React from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { Typography, Paper, Switch } from "@mui/material";
import { bool, func } from "prop-types";

const ContactsMenu = ({ setShowRead, showRead }) => {
  const { isDark } = useTheme();

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 0.5,
          backgroundColor: isDark ? "darkModeColor.main" : "mainColor.main",
        }}
      >
        <Switch
          defaultChecked
          onChange={() => {
            setShowRead((prev) => !prev);
          }}
        />
        <Typography
          variant="body1"
          component="span"
          fontWeight={700}
          color={showRead ? "primary" : "text"}
        >
          Unread only
        </Typography>
      </Paper>
    </>
  );
};

ContactsMenu.propTypes = {
  setShowRead: func.isRequired,
  showRead: bool.isRequired,
};

export default ContactsMenu;

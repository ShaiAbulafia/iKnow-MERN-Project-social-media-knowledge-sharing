import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { useTheme } from "../../providers/ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EmailIcon from "@mui/icons-material/Email";
import { Divider, Typography } from "@mui/material";

const Footer = () => {
  const { isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Paper
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        p: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{
          height: 45,
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          borderTop: 1,
          borderColor: isDark ? "darkModeColor.main" : "white",
        }}
      >
        {isDark ? (
          <BottomNavigationAction
            label="Light mode"
            icon={<LightModeIcon fontSize="small" />}
            onClick={toggleDarkMode}
          />
        ) : (
          <BottomNavigationAction
            label="Dark mode"
            icon={<DarkModeIcon fontSize="small" />}
            onClick={toggleDarkMode}
          />
        )}

        <BottomNavigationAction
          label="About"
          icon={<InfoIcon fontSize="small" />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        {user && (
          <BottomNavigationAction
            label="Contact Us"
            icon={<EmailIcon fontSize="small" />}
            onClick={() => navigate(ROUTES.CREATE_CONTACTS)}
          />
        )}
      </BottomNavigation>
      <Divider />
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
          display: "block",
        }}
      >
        &copy; Shai Abulafia. all rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;

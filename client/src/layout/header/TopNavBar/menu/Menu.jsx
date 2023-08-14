import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";
import MenuLink from "./MenuLink";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../../../../providers/ThemeProvider";
import Divider from "@mui/material/Divider";
const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { isDark, toggleDarkMode } = useTheme();

  const { user } = useUser();
  const { handleLogout } = useUsers();
  const [color, setColor] = useState(() => {
    if (isDark) return "#fff";
    return "#000";
  });

  useEffect(() => {
    if (isDark) return setColor("#fff");
    return setColor("#000");
  }, [isDark]);

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        {user && (
          <Box>
            <Box sx={{ display: { md: "none" } }}>
              <MenuLink
                label="about"
                color={color}
                navigateTo={ROUTES.ABOUT}
                onClick={onClose}
              />
              <MenuLink
                label="Posts"
                color={color}
                navigateTo={`${ROUTES.POSTS}/all_posts`}
                onClick={onClose}
              />

              <MenuLink
                label="Store"
                color={color}
                navigateTo={ROUTES.PRODUCTS}
                onClick={onClose}
              />

              {user.isAdmin && (
                <MenuLink
                  label="Admin"
                  color={color}
                  navigateTo={`${ROUTES.ADMIN}/users`}
                  onClick={onClose}
                />
              )}
              <Divider />
            </Box>
            <MenuLink
              label="profile"
              color={color}
              navigateTo={`${ROUTES.USER_PROFILE}/view/${user._id}`}
              onClick={onClose}
            />

            <MenuLink
              label="User Info"
              color={color}
              navigateTo={`${ROUTES.USER_PROFILE}/${user._id}`}
              onClick={onClose}
            />

            <MenuLink
              label="edit account"
              color={color}
              navigateTo={`${ROUTES.EDIT_USER}/${user._id}`}
              onClick={onClose}
            />
            <MenuLink
              label="My orders"
              color={color}
              navigateTo={`${ROUTES.ORDERS}`}
              onClick={onClose}
            />

            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Box>
        )}
        {!user && (
          <Box>
            <Box sx={{ display: { md: "none" } }}>
              <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
            <MenuLink
              label="login"
              color={color}
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
            />
            <MenuLink
              label="signup"
              color={color}
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
            />
          </Box>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;

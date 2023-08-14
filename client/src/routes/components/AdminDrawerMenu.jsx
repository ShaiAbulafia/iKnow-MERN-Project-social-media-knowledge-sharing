import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import NavItem from "./NavItem";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import DrawerListItem from "./DrawerListItem";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../routesModel";
import { useTheme } from "../../providers/ThemeProvider";
import { useNavigate } from "react-router-dom";

const AdminDrawerMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useUser();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) navigate(ROUTES.POSTS);
    navigate("users");
  }, []);

  return (
    <>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          top: 67,
          borderBottom: 1,
          borderTop: 1,
          borderColor: isDark ? "darkModeColor.main" : "white",
          backgroundColor: isDark ? "darkModeColor.main" : "forthColor.main",
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>

        <Drawer anchor="top" open={isOpen} onClose={() => setOpen(false)}>
          <List
            sx={{
              borderBottom: 1,
              p: 0,
              borderColor: isDark ? "darkModeColor.main" : "white",
              backgroundColor: isDark
                ? "darkModeColor.main"
                : "forthColor.main",
            }}
          >
            <DrawerListItem
              label="CRM"
              navigateTo="users"
              onClose={() => setOpen(false)}
              divider={false}
            />
            <DrawerListItem
              label="Orders"
              navigateTo="orders"
              onClose={() => setOpen(false)}
              divider={false}
            />
            <DrawerListItem
              label="analyzes"
              navigateTo="analyzes"
              onClose={() => setOpen(false)}
              divider={false}
            />
            <DrawerListItem
              label="user contacts"
              navigateTo="contacts"
              onClose={() => setOpen(false)}
              divider={false}
            />
          </List>
        </Drawer>

        <Box
          sx={{
            display: { xs: "none", md: "inline-flex" },
            justifyContent: "center",
          }}
        >
          <NavItem label="CRM" to="users" color="white" />
          <NavItem label="Orders" to="orders" color="white" />
          <NavItem label="analyzes" to="analyzes" color="white" />
          <NavItem label="user contacts" to="contacts" color="white" />
        </Box>
      </AppBar>

      <Outlet />
    </>
  );
};

export default AdminDrawerMenu;

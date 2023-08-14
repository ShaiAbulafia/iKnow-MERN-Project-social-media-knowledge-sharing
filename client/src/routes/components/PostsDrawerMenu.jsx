import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import NavItem from "./NavItem";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import DrawerListItem from "./DrawerListItem";
import { useTheme } from "../../providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";

const PostsDrawerMenu = () => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("all_posts");
  }, []);

  return (
    <>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          width: "100%",
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
              label="all posts"
              navigateTo="all_posts"
              onClose={() => setOpen(false)}
            />
            {user && (
              <>
                <DrawerListItem
                  label="create post"
                  navigateTo="create_post"
                  onClose={() => setOpen(false)}
                />
                <DrawerListItem
                  label="fav posts"
                  navigateTo="fav_posts"
                  onClose={() => setOpen(false)}
                />
                <DrawerListItem
                  label="my posts"
                  navigateTo="my_posts"
                  onClose={() => setOpen(false)}
                />
              </>
            )}
          </List>
        </Drawer>

        <Box
          sx={{
            display: { xs: "none", md: "inline-flex" },
            justifyContent: "center",
          }}
        >
          <NavItem label="all posts" to="all_posts" color="white" />
          {user && (
            <>
              <NavItem label="create post" to="create_post" color="white" />
              <NavItem label="fav posts" to="fav_posts" color="white" />
              <NavItem label="my posts" to="my_posts" color="white" />
            </>
          )}
        </Box>
      </AppBar>

      <Outlet />
    </>
  );
};

export default PostsDrawerMenu;

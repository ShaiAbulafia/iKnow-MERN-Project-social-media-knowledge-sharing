import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LeftNavBar from "./left-navigations/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";
import { MenuProvider } from "./menu/MenuProvider";
import { useTheme } from "../../../providers/ThemeProvider";

export const NavBar = () => {
  const { isDark } = useTheme();
  return (
    <MenuProvider>
      <AppBar
        position="sticky"
        color={isDark ? "" : "mainColor"}
        sx={{
          borderBottom: 1,
          borderColor: isDark ? "darkModeColor.main" : "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", padding: "0" }}>
          <LeftNavBar />

          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
};

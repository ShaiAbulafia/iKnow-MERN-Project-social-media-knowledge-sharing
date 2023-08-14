import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { node } from "prop-types";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import NewNotificationsMenu from "../components/NewNotificationsMenu";
import useNotifications from "../hooks/useNotifications";
import { useUser } from "../../users/providers/UserProvider";

const NotificationsMenuContext = React.createContext(null);

export const NotificationsMenuProvider = ({ children }) => {
  const { user } = useUser();
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const anchorRef = useRef();
  const { valueNotif, handleGetNewNotifications, handleChangeRead } =
    useNotifications();

  useEffect(() => {
    setAnchor(anchorRef.current);
    if (user) handleGetNewNotifications();
  }, [user]);

  useEffect(() => {
    setAnchor(anchorRef.current);
    if (user) handleGetNewNotifications();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [screenSize]);

  const value = useMemo(() => {
    return { valueNotif, setOpen };
  }, [valueNotif, setOpen]);

  const onCloseMenu = useCallback(async () => {
    setOpen(false);
    if (user && valueNotif.notifications.length) {
      await handleChangeRead(valueNotif.notifications);
    }
  }, [user, valueNotif, handleChangeRead]);

  return (
    <>
      <NotificationsMenuContext.Provider value={value}>
        {children}
      </NotificationsMenuContext.Provider>

      <Box
        ref={anchorRef}
        component="span"
        position="fixed"
        top="70px"
        right={{ xs: "50px", sm: "80px", md: "90px", lg: "100px" }}
      >
        {anchorEL && (
          <NewNotificationsMenu
            anchorEl={anchorEL}
            isOpen={isOpen}
            onClose={onCloseMenu}
            notifications={valueNotif.notifications}
            isLoading={valueNotif.isLoading}
            error={valueNotif.error}
          />
        )}
      </Box>
    </>
  );
};

export const useNotificationMenu = () => {
  const context = useContext(NotificationsMenuContext);
  if (!context)
    throw new Error("useMenu must be used within a NotificationsMenuProvider");
  return context;
};

NotificationsMenuProvider.propTypes = {
  children: node.isRequired,
};

import React, { useCallback, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotificationMenu } from "../../../../notifications/providers/NotificationsMenuProvider";

const Notifications = () => {
  const { setOpen, valueNotif } = useNotificationMenu();

  return (
    <IconButton sx={{ marginLeft: 1 }} onClick={() => setOpen(true)}>
      <Badge
        badgeContent={
          valueNotif.notifications && valueNotif.notifications.length
        }
        color="success"
      >
        <NotificationsIcon
          fontSize="large"
          color={
            !valueNotif.notifications || !valueNotif.notifications.length
              ? "inherit"
              : "primary"
          }
        />
      </Badge>
    </IconButton>
  );
};

export default Notifications;

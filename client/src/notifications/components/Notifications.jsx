import React from "react";
import { string, bool, arrayOf } from "prop-types";
import notificationsType from "../models/types/notificationsType";
import { Box, Divider, List, ListItem } from "@mui/material";
import Notification from "./Notification";

const Notifications = ({ notifications }) => {
  return (
    <>
      <List sx={{ p: 0, m: 0 }}>
        {notifications.map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))}
      </List>
    </>
  );
};

Notifications.propTypes = {
  notifications: arrayOf(notificationsType).isRequired,
};

export default Notifications;

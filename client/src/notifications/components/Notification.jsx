import React from "react";
import notificationsType from "../models/types/notificationsType";
import {
  Avatar,
  CardActionArea,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const date = new Date(notification.createdAt);
  return (
    <>
      <ListItem>
        <CardActionArea
          sx={{ display: "flex" }}
          onClick={() => navigate(`../${notification.target}`)}
        >
          <ListItemAvatar>
            <Avatar src={notification.avatarUrl} alt={notification.avatarAlt} />
          </ListItemAvatar>
          <ListItemText
            primary={notification.title}
            secondary={date.toLocaleString()}
          />
        </CardActionArea>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

Notification.propTypes = {
  notification: notificationsType.isRequired,
};

export default Notification;

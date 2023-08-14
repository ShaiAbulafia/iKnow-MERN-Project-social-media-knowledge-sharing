import React from "react";
import { string, bool, arrayOf } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

import { CircularProgress, Container, Typography } from "@mui/material";
import notificationsType from "../models/types/notificationsType";
import Notifications from "./Notifications";

const NotificationsFeedback = ({ isLoading, error, notifications }) => {
  if (isLoading) return <CircularProgress sx={{ alignSelf: "center" }} />;
  if (error)
    return (
      <Container>
        <Typography variant="body1" textAlign="center">
          {error}
        </Typography>
      </Container>
    );
  if (!notifications || !notifications.length)
    return (
      <Container>
        <Typography variant="body1" textAlign="center">
          No notifications.
        </Typography>
      </Container>
    );
  if (notifications)
    return (
      <Notifications
        notifications={notifications.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        })}
      />
    );
  return null;
};

NotificationsFeedback.propTypes = {
  notifications: arrayOf(notificationsType),
  isLoading: bool.isRequired,
  error: string,
};

export default NotificationsFeedback;

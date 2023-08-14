import MuiMenu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import notificationsType from "../models/types/notificationsType";
import { arrayOf, bool, string } from "prop-types";
import NotificationsFeedback from "./NotificationsFeedback";
import { Container, Divider, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const NewNotificationsMenu = ({
  isOpen,
  anchorEl,
  onClose,
  isLoading,
  error,
  notifications,
}) => {
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
      <Container maxWidth="xs">
        <NotificationsFeedback
          notifications={notifications}
          isLoading={isLoading}
          error={error}
        />
        <Divider sx={{ mb: 1 }} />
        <Link to={ROUTES.NOTIFICATIONS} style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="primary">
            View read notifications
          </Typography>
        </Link>
      </Container>
    </MuiMenu>
  );
};

NewNotificationsMenu.propTypes = {
  notifications: arrayOf(notificationsType),
  isLoading: bool.isRequired,
  error: string,
};

export default NewNotificationsMenu;

import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Box, Container, Paper } from "@mui/material";
import useNotifications from "../hooks/useNotifications";
import { useUser } from "../../users/providers/UserProvider";
import NotificationsFeedback from "../components/NotificationsFeedback";
import { useTheme } from "../../providers/ThemeProvider";

const NotificationsPage = () => {
  const { user } = useUser();
  const { isDark } = useTheme();
  const { valueNotif, handleGetNotifications } = useNotifications();

  useEffect(() => {
    if (user) handleGetNotifications();
  }, [user]);

  return (
    <Container sx={{ pt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "darkModeColor.main" : "thirdColor.main",
        }}
      >
        <Box pl={4}>
          <NotificationsFeedback
            notifications={valueNotif.notifications}
            isLoading={valueNotif.isLoading}
            error={valueNotif.error}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default NotificationsPage;

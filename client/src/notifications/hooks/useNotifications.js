import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import {
  getNotifications,
  getNewNotifications,
  changeReadNotif,
} from "../services/notificationApiService";
import { useSnack } from "../../providers/SnackbarProvider";

const useNotifications = () => {
  const [notifications, setNotifications] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useAxios();
  const snack = useSnack();

  const requestStatus = useCallback((loading, errorMessages, notifications) => {
    setLoading(loading);
    setError(errorMessages);
    setNotifications(notifications);
  }, []);

  const handleGetNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const notifications = await getNotifications();
      requestStatus(false, null, notifications);
      return notifications;
    } catch (error) {
      requestStatus(false, error.message, notifications);
    }
  }, [notifications, requestStatus]);

  const handleGetNewNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const notifications = await getNewNotifications();
      requestStatus(false, null, notifications);
      return notifications;
    } catch (error) {
      requestStatus(false, error.message, notifications);
    }
  }, [notifications, requestStatus]);

  const handleChangeRead = useCallback(
    async (notificationsList) => {
      try {
        setLoading(true);
        await changeReadNotif(notificationsList);
        const notifications = await getNewNotifications();
        requestStatus(false, null, notifications);
        return notifications;
      } catch (error) {
        requestStatus(false, error.message, notifications);
      }
    },
    [notifications, requestStatus]
  );

  const valueNotif = useMemo(() => {
    return {
      isLoading,
      error,
      notifications,
    };
  }, [isLoading, error, notifications]);

  return {
    valueNotif,
    handleGetNotifications,
    handleGetNewNotifications,
    handleChangeRead,
  };
};

export default useNotifications;

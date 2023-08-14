const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  getNotifications,
  getNotificationsNew,
  setReadNotifications,
} = require("../models/notificationsAccessDataService");
const router = express.Router();

router.get("/new", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await getNotificationsNew(userId);
    return res.send(notifications);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await getNotifications(userId);
    return res.send(notifications);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const { notificationsList } = req.body;
    const notifications = await setReadNotifications(notificationsList);
    return res.send(notifications);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

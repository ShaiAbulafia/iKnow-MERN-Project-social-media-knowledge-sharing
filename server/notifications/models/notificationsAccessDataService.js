const Notification = require("./mongodb/Notification");
const { handleBadRequest } = require("../../utils/handleErrors");
const DB = process.env.DB || "MONGODB";

const getNotifications = async (user_Id) => {
  if (DB === "MONGODB") {
    try {
      let notifications = await Notification.find({ userId: user_Id });
      return Promise.resolve(notifications);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const getNotificationsNew = async (user_Id) => {
  if (DB === "MONGODB") {
    try {
      let notifications = await Notification.find({ userId: user_Id });
      if (!notifications) return Promise.resolve(notifications);
      let notificationsFilter = notifications.filter(
        (notification) => notification.read === false
      );
      return Promise.resolve(notificationsFilter);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const setReadNotifications = async (notificationsList) => {
  if (DB === "MONGODB") {
    try {
      if (!notificationsList) return Promise.resolve([]);
      for (let notif of notificationsList) {
        let notification = await Notification.findById(notif._id);
        notification.read = true;
        notification = await notification.save();
      }
      return Promise.resolve(notificationsList);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const newNotification = async (notifictaionObj) => {
  if (DB === "MONGODB") {
    try {
      let notification = new Notification(notifictaionObj);
      notification = await notification.save();
      return Promise.resolve(notification);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

const newSystemNotification = async (notifictaionObj) => {
  if (DB === "MONGODB") {
    try {
      let systemNotif = {
        ...notifictaionObj,
        avatarUrl: "/assets/images/iKnowLogo.png",
        avatarAlt: "system notification image",
      };
      let notification = new Notification(systemNotif);
      notification = await notification.save();
      return Promise.resolve(notification);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get notifictaions not in mongodb");
};

exports.getNotifications = getNotifications;
exports.getNotificationsNew = getNotificationsNew;
exports.setReadNotifications = setReadNotifications;
exports.newNotification = newNotification;
exports.newSystemNotification = newSystemNotification;

const express = require("express");
const router = express.Router();
const { handleError } = require("../utils/handleErrors");
const productsRestController = require("../products/routes/productsRestController");
const usersRestController = require("../users/routes/usersRestController");
const cartsRestController = require("../carts/routes/cartsRestController");
const ordersRestController = require("../orders/routes/ordersRestController");
const postsRestController = require("../posts/routes/postsRestController");
const commentsRestController = require("../comments/routes/commentsRestController");
const notificationsRestController = require("../notifications/routes/notificationsRestController");
const contactsRestController = require("../contacts/routes/contactsRestController");

router.use("/products", productsRestController);
router.use("/users", usersRestController);
router.use("/carts", cartsRestController);
router.use("/orders", ordersRestController);
router.use("/posts", postsRestController);
router.use("/comments", commentsRestController);
router.use("/notifications", notificationsRestController);
router.use("/contacts", contactsRestController);

router.use((req, res) => handleError(res, 404, "Page not found!"));

module.exports = router;

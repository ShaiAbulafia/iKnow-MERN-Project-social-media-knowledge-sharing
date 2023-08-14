const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  getOrder,
  getOrders,
  addOrder,
  getAllOrders,
  changeOrderStatus,
} = require("../models/ordersAccessDataService");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await getOrders(userId);
    return res.send(orders);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
router.get("/allOrders", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all orders in the database"
      );

    const orders = await getAllOrders();
    return res.send(orders);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const order = await getOrder(id, user);
    return res.send(order);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let { products, totalPrice, useKPoints } = req.body;
    const user = req.user;
    let order = await addOrder(user._id, products, totalPrice, useKPoints);
    return res.status(201).send(order);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    let { orderStatus } = req.body;
    const { id } = req.params;
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to change order status"
      );
    let order = await changeOrderStatus(id, orderStatus);
    return res.status(201).send(order);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
module.exports = router;

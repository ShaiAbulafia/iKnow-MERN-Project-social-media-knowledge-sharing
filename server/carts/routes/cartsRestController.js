const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  addToCart,
  emptyCart,
  getCart,
  removeFromCart,
  changeCartAmounts,
} = require("../models/cartsAccessDataService");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await getCart(userId);
    return res.send(cart);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let { productId, amount } = req.body;
    const user = req.user;
    let cart = await addToCart(user._id, productId, amount);
    return res.status(201).send(cart);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    let { productId, amount } = req.body;
    const user = req.user;
    let cart = await changeCartAmounts(user._id, productId, amount);
    return res.status(201).send(cart);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    let { productId } = req.body;
    const user = req.user;
    let cart = await removeFromCart(user._id, productId);
    return res.status(201).send(cart);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const user = req.user;
    let cart = await emptyCart(user._id);
    return res.status(201).send(cart);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

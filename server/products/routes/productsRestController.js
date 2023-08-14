const express = require("express");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const normalizeProduct = require("../helpers/normalizeProduct");
const {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
  wishProduct,
} = require("../models/productsAccessDataService");
const validateProduct = require("../validations/productValidationService");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    return res.send(products);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    return res.send(product);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let product = req.body;
    const user = req.user;

    if (!user.isAdmin)
      return handleError(res, 403, "Authentication Error: Unauthorize user");

    const { error } = validateProduct(product);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    product = await normalizeProduct(product);

    product = await createProduct(product);
    return res.status(201).send(product);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let product = req.body;
    const productId = req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      const message = "Authorization Error: Only admin can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateProduct(product);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    product = await normalizeProduct(product);
    product = await updateProduct(productId, product);
    return res.send(product);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const product = await wishProduct(productId, userId);
    return res.send(product);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      const message = "Authorization Error: Only admin can delete products";
      return handleError(res, 403, message);
    }

    const product = await deleteProduct(productId);
    return res.send(product);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

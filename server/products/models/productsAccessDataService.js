const Product = require("./mongodb/Product");
const { handleBadRequest } = require("../../utils/handleErrors");
const Cart = require("../../carts/models/mongodb/Cart");
const DB = process.env.DB || "MONGODB";

const getProducts = async () => {
  if (DB === "MONGODB") {
    try {
      const products = await Product.find();
      return Promise.resolve(products);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get product not in mongodb");
};

const getProduct = async (productId) => {
  if (DB === "MONGODB") {
    try {
      let product = await Product.findById(productId);
      if (!product)
        throw new Error("Could not find this product in the database");
      return Promise.resolve(product);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get product not in mongodb");
};

const createProduct = async (normalizedProduct) => {
  if (DB === "MONGODB") {
    try {
      let product = new Product(normalizedProduct);
      product = await product.save();
      return Promise.resolve(product);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create product not in mongodb");
};

const updateProduct = async (productId, normalizedProduct) => {
  if (DB === "MONGODB") {
    try {
      let product = await Product.findByIdAndUpdate(
        productId,
        normalizedProduct,
        {
          new: true,
        }
      );

      if (!product)
        throw new Error(
          "A product with this ID cannot be found in the database"
        );

      return Promise.resolve(product);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product update not in mongodb");
};

const wishProduct = async (productId, userId) => {
  if (DB === "MONGODB") {
    try {
      let product = await Product.findById(productId);
      if (!product)
        throw new Error(
          "A product with this ID cannot be found in the database"
        );
      const productWishes = product.wishes.find((id) => id === userId);

      if (!productWishes) {
        product.wishes.push(userId);
        product = await product.save();
        return Promise.resolve(product);
      }

      const productFiltered = product.wishes.filter((id) => id !== userId);
      product.wishes = productFiltered;
      product = await product.save();
      return Promise.resolve(product);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product wish not in mongodb");
};

const deleteProduct = async (productId) => {
  if (DB === "MONGODB") {
    try {
      let product = await Product.findById(productId);

      if (!product)
        throw new Error(
          "A product with this ID cannot be found in the database"
        );
      let carts = await Cart.find();
      for (let cart of carts) {
        let filteredProducts = [];
        for (let product of cart.products) {
          if (product.productId !== productId) filteredProducts.push(product);
        }
        cart.products = filteredProducts;
        if (!cart.products.length) cart.active = false;
        cart = await cart.save();
      }

      product = await Product.findByIdAndDelete(productId);

      return Promise.resolve(product);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product deleted not in mongodb");
};

exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.wishProduct = wishProduct;
exports.deleteProduct = deleteProduct;

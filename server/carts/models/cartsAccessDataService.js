const Cart = require("./mongodb/Cart");
const Product = require("../../products/models/mongodb/Product");
const { handleBadRequest } = require("../../utils/handleErrors");
const DB = process.env.DB || "MONGODB";

const getCart = async (user_Id) => {
  if (DB === "MONGODB") {
    try {
      let cart = await Cart.findOne({ userId: user_Id });
      if (!cart) {
        cart = new Cart({ userId: user_Id, products: [] });
        cart = await cart.save();
      }
      return Promise.resolve(cart);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get product not in mongodb");
};

const addToCart = async (user_Id, productId, userAmount) => {
  if (DB === "MONGODB") {
    try {
      let cart = await Cart.findOne({ userId: user_Id });
      if (!cart) {
        cart = new Cart({ userId: user_Id, products: [] });
        cart = await cart.save();
      }

      let product = await Product.findById(productId);

      if (!product)
        throw new Error("Could not find this product in the database");

      let productExist = false;
      for (let cartProduct of cart.products) {
        if (cartProduct.productId === productId) {
          productExist = true;
          cartProduct.amount += userAmount;
          if (cartProduct.amount > product.stock)
            throw new Error("Theres not enought in stock");
        }
      }

      if (!productExist)
        cart.products.push({ productId: productId, amount: userAmount });
      cart.active = true;
      cart = await cart.save();
      return Promise.resolve(cart);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product updateProduct not in mongodb");
};

const changeCartAmounts = async (user_Id, productId, userAmount) => {
  if (DB === "MONGODB") {
    try {
      let cart = await Cart.findOne({ userId: user_Id });
      if (!cart) {
        throw new Error("Could not find cart in the database");
      }

      let product = await Product.findById(productId);

      if (!product)
        throw new Error("Could not find this product in the database");

      let productExist = false;
      for (let cartProduct of cart.products) {
        if (cartProduct.productId === productId) {
          productExist = true;
          cartProduct.amount = userAmount;
          if (cartProduct.amount > product.stock)
            throw new Error("Theres not enought in stock");
        }
      }

      if (!productExist)
        cart.products.push({ productId: productId, amount: userAmount });
      cart.active = true;
      cart = await cart.save();
      return Promise.resolve(cart);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product updateProduct not in mongodb");
};

const removeFromCart = async (user_Id, product_Id) => {
  if (DB === "MONGODB") {
    try {
      let cart = await Cart.findOne({ userId: user_Id });
      if (!cart) throw new Error("Could not find this cart in the database");
      let newProductsList = [];
      let productExist = false;
      for (let cartProduct of cart.products) {
        if (cartProduct.productId === product_Id) {
          productExist = true;
        } else {
          newProductsList.push(cartProduct);
        }
      }

      if (!productExist) throw new Error("This product not in cart");
      cart.products = newProductsList;
      if (cart.products.length === 0) cart.active = false;
      cart = await cart.save();
      return Promise.resolve(cart);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product updateProduct not in mongodb");
};

const emptyCart = async (user_Id) => {
  if (DB === "MONGODB") {
    try {
      let cart = await Cart.findOne({ userId: user_Id });
      if (!cart) throw new Error("Could not find this cart in the database");
      cart.products = [];
      cart.active = false;
      cart = await cart.save();
      return Promise.resolve(cart);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("product updateProduct not in mongodb");
};

exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.emptyCart = emptyCart;
exports.changeCartAmounts = changeCartAmounts;

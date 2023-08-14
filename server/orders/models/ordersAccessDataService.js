const Order = require("./mongodb/Order");
const { handleBadRequest } = require("../../utils/handleErrors");
const User = require("../../users/models/mongodb/User");
const generateOrderNumber = require("../helpers/generateOrderNumber");
const Product = require("../../products/models/mongodb/Product");
const {
  newSystemNotification,
} = require("../../notifications/models/notificationsAccessDataService");
const DB = process.env.DB || "MONGODB";

const getOrder = async (orderId, user) => {
  if (DB === "MONGODB") {
    try {
      let order = await Order.findById(orderId);
      if (!order) throw new Error("Could not find this order in the database");
      if (!user.isAdmin && order.userId.toString() !== user._id)
        throw new Error(
          "Authorization Error: Only the user who sent the order or admin can see this order"
        );
      return Promise.resolve(order);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get order not in mongodb");
};

const getOrders = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let orders = await Order.find({ userId: userId });
      return Promise.resolve(orders);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get order not in mongodb");
};

const getAllOrders = async () => {
  if (DB === "MONGODB") {
    try {
      let orders = await Order.find();
      return Promise.resolve(orders);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get order not in mongodb");
};

const addOrder = async (user_Id, products, totalPrice, useKPoints) => {
  if (DB === "MONGODB") {
    try {
      let kPointsUsed = 0;
      let user = await User.findById(user_Id);
      if (useKPoints) {
        if (!user) throw new Error("Could not find user in the database");

        if (totalPrice * 100 > user.kPoints) {
          kPointsUsed = Math.floor(user.kPoints / 100) * 100;
          user.kPoints = user.kPoints - Math.floor(user.kPoints / 100) * 100;
        }

        if (totalPrice * 100 <= user.kPoints) {
          kPointsUsed = totalPrice * 100;
          user.kPoints = user.kPoints - totalPrice * 100;
        }

        user = await user.save();
      }
      let userOrder = {
        userId: user_Id,
        products: products,
        totalPrice: totalPrice,
        orderAddress: user.address,
        contactPhone: user.phone,
        kPointsUsed: kPointsUsed,
        orderNumber: await generateOrderNumber(),
      };
      let order = new Order({ ...userOrder });
      order = await order.save();

      for (let listProduct of products) {
        let product = await Product.findById(listProduct.product._id);
        product.stock = product.stock - listProduct.amount;
        product = await product.save();
      }
      return Promise.resolve(order);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("order addOrder not in mongodb");
};

const changeOrderStatus = async (orderId, orderStatus) => {
  if (DB === "MONGODB") {
    try {
      let order = await Order.findById(orderId);
      if (orderStatus === "Canceled") {
        let user = await User.findById(order.userId);
        if (!user) throw new Error("Could not find user in the database");
        user.kPoints = user.kPoints + order.kPointsUsed;
        user = await user.save();
      }
      order.status = orderStatus;
      order = await order.save();
      newSystemNotification({
        userId: order.userId,
        target: `orders/${order._id}`,
        title: `order ${order.orderNumber} updated status to '${orderStatus}'`,
      });
      return Promise.resolve(order);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("order addOrder not in mongodb");
};

exports.getOrder = getOrder;
exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.getAllOrders = getAllOrders;
exports.changeOrderStatus = changeOrderStatus;

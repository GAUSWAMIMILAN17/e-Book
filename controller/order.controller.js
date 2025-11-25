import express from "express";

import { Order } from "../models/orderschema.model.js";
import { Book } from "../models/bookschema.model.js";

// place order

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const { books, paymentMode } = req.body;
    console.log(req.body);

    if (!books || books.length === 0) {
      return res.status(400).json({
        message: "No book provided",
        success: false,
      });
    }

    let total = 0;
    for (let item of books) {
      const book = await Book.findById(item.book);
      if (book) {
        total += book.price * (item.quantity || 1);
      }
    }

    const order = new Order({
      user: userId,
      books,
      totalAmount: total,
      paymentMode,
      paymentStatus: paymentMode === "cod" ? "pending" : "paid",
    });

    await order.save();

    await order.populate([
      { path: "user", select: "-password" },
      { path: "books.book" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get my orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate("books.book");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// get  one order

export const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("books.book");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// get all orders by admin
export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find().populate("books.book").populate("user", "name email")
    return res.status(200).json({ success: true, orders });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// get one order by admin see
export const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("books.book").populate("user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });

};

}


// update order status only admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

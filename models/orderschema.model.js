import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }],
  quantity: {
    type: Number,
    default: 1
  },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "shipped", "delivered"],
    default: "pending"
  }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

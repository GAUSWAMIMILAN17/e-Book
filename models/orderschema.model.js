import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }],
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "paid"
  }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

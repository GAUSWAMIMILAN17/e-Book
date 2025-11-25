import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },

  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      }
    }
  ],

  paymentMode: {
    type: String,
    enum: ["online", "cod"],
    default: "cod"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum: ["pending", "approved", "rejected", "shipped", "delivered"],
    default: "pending"
  },

  totalAmount: {
    type: Number,
    required: true
  },

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

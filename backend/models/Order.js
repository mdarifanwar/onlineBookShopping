import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number,
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      },
    ],
    totalPrice: Number,
    isDelivered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
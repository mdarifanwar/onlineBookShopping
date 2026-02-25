import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export default router;
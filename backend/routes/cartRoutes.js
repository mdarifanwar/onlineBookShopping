import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

// Cart is stored per user in DB (simple implementation)
const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        qty: { type: Number, default: 1 },
      },
    ],
  })
);

// Get current user's cart
router.get("/", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("items.book");
  if (!cart) cart = { items: [] };
  // Remove items with missing book data
  if (cart.items) {
    cart.items = cart.items.filter(item => item.book && item.book.title && item.book.price != null);
    await cart.save();
  }
  res.json(cart);
});

// Add item to cart
router.post("/add", protect, async (req, res) => {
  const { bookId, qty } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }
  const idx = cart.items.findIndex((i) => i.book.toString() === bookId);
  if (idx > -1) {
    cart.items[idx].qty += qty || 1;
  } else {
    cart.items.push({ book: bookId, qty: qty || 1 });
  }
  await cart.save();
  await cart.populate("items.book");
  res.json(cart);
});

// Update item quantity
router.put("/update", protect, async (req, res) => {
  const { bookId, qty } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  const idx = cart.items.findIndex((i) => i.book.toString() === bookId);
  if (idx > -1) {
    cart.items[idx].qty = qty;
    await cart.save();
    await cart.populate("items.book");
    res.json(cart);
  } else {
    res.status(404).json({ message: "Book not in cart" });
  }
});

// Remove item from cart
router.delete("/remove/:bookId", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.items = cart.items.filter((i) => i.book.toString() !== req.params.bookId);
  await cart.save();
  await cart.populate("items.book");
  res.json(cart);
});

// Clear cart
router.delete("/clear", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
    await cart.populate("items.book");
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
});

export default router;
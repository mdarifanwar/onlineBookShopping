
import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// GET single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(404).json({ message: "Book not found" });
  }
});

// GET books with pagination
router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 20;
  const skip = (page - 1) * pageSize;
  const total = await Book.countDocuments();
  const books = await Book.find().skip(skip).limit(pageSize);
  res.json({
    books,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    total
  });
});

// CREATE book
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// UPDATE book
router.put("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    Object.assign(book, req.body);
    const updatedBook = await book.save();
// GET single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(404).json({ message: "Book not found" });
  }
});
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE book
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    res.json({ message: "Book removed" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Submit a review for a book
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
router.post("/:id/reviews", protect, async (req, res) => {
  const { rating, comment } = req.body;
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  // Prevent duplicate review by same user
  const alreadyReviewed = book.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    return res.status(400).json({ message: "Book already reviewed by user" });
  }
  // Check if user has purchased the book
  const userOrders = await Order.find({ user: req.user._id });
  const hasPurchased = userOrders.some(order =>
    order.orderItems.some(item => item.book && item.book.toString() === book._id.toString())
  );
  if (!hasPurchased) {
    return res.status(403).json({ message: "You can only review books you have purchased." });
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  book.reviews.push(review);
  book.numReviews = book.reviews.length;
  book.rating =
    book.reviews.reduce((acc, item) => item.rating + acc, 0) /
    book.reviews.length;
  await book.save();
  res.status(201).json({ message: "Review added" });
});

export default router;
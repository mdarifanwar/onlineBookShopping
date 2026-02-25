import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
    category: String,
    price: Number,
    countInStock: Number,
    image: String,
    sample: String, // sample text or excerpt for preview
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
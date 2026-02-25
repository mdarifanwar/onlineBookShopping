import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    image: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    sample: { type: String }, // sample text or excerpt for preview
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
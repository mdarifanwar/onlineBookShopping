import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();

/* ===========================
   Middleware
=========================== */

// ✅ Allow all origins (Fixes Vercel CORS issue)
app.use(cors());

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Parse JSON request body
app.use(express.json());

/* ===========================
   Routes
=========================== */

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ===========================
   MongoDB Connection
=========================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
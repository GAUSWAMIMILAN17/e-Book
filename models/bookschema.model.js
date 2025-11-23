import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  category: String,
  coverImage: String,      // cloudinary URL
  fileUrl: String,         // PDF file URL
  pages: Number,
  price: { type: Number, default: 0 },  // free = 0
  language: String,
  publishedYear: Number,
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stars: Number,
    review: String
  }]
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);

import mongoose from "mongoose";
import { Book } from "../models/bookschema.model.js";

// Add New Book
export const addNewBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      pages,
      price,
      language,
      publishedYear,
    } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({
        message: "Missing Field Is Required",
        success: false,
      });
    }

    const book = new Book({
      title,
      author,
      description,
      category,
      pages,
      price,
      language,
      publishedYear,
    });

    await book.save();

    return res.status(200).json({
      message: "Book Added Succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// get book
export const getAllBook = async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books) {
      return res.status(400).json({
        message: "book not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};

// delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID from params:", id);
    // const books = await Book.find({});
    // console.log(books);
    const book = await Book.findById(id);
    // console.log("BOOK FOUND:", book);

    if (!book) {
      return res.status(400).json({
        message: "Book not Found",
        success: false,
      });
    }

    await Book.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Book Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// update Book
export const updateBook = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id)

    let book = await Book.findById(id)
    console.log(book)

    const {title, author, description, category, pages, price, language, publishedYear } = req.body

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.category = category ?? book.category;
    book.pages = pages ?? book.pages;
    book.price = price ?? book.price;
    book.language = language ?? book.language;
    book.publishedYear = publishedYear ?? book.publishedYear;

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};



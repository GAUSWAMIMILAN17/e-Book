import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    phonenumber: {type: Number, required: true, unique: true},
    password: { type: String, require: true },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    profile: {
      bio: {
        type: String,
      },
      profilePhoto: {
        type: String, // URL to profile photo file
        default: "",
      },
      address: {
        type: String,
        require: true
      }
    },
    purchasedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)

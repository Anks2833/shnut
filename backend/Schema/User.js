// Import the mongoose library for database operations
import mongoose from "mongoose";

// Destructure Schema for cleaner syntax
const { Schema } = mongoose;

// Define the schema for the User model
const userSchema = new Schema(
  {
    // User's name (required field)
    name: {
      type: String,
      required: true,
    },

    // User's email address (required field)
    email: {
      type: String,
      required: true,
    },

    // A brief description about the user (optional)
    about: {
      type: String,
    },

    // Timestamp for when the user's profile was last updated
    updated: {
      type: Date,
    },

    // User's password (required field)
    password: {
      type: String,
      required: true,
    },

    // Timestamp for when the user account was created (defaults to the current date and time)
    date: {
      type: Date,
      default: Date.now,
    },

    // URL for the user's profile image with a default placeholder
    image: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",
    },

    // Array of ObjectIds representing users this user is following
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users", // Reference to the "users" collection
      },
    ],

    // Array of ObjectIds representing users following this user
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users", // Reference to the "users" collection
      },
    ],
  },
  {
    // Automatically add `createdAt` and `updatedAt` timestamps
    timestamps: true,
  }
);

// Create and export the User model
const User = mongoose.model("users", userSchema);
export default User;
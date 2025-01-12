// Import the mongoose library for database operations
import mongoose from "mongoose";

// Define the schema for the Post model
const PostSchema = new mongoose.Schema(
  {
    // Caption for the post (optional)
    caption: {
      type: String,
    },

    // URL or path of the photo associated with the post
    photo: {
      type: String,
    },

    // Public ID for the photo, useful for cloud storage (e.g., Cloudinary)
    publicID: {
      type: String,
    },

    // Timestamp for when the post was created, defaults to the current date and time
    created: {
      type: Date,
      default: Date.now,
    },

    // Flag to indicate if the post is new
    new: {
      type: Boolean,
      default: false,
    },

    // Reference to the user (author) who created the post
    author: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },

    // Embedded object for additional user details
    userDetails: {
      // Name of the user
      name: {
        type: String,
      },
      // Profile image URL or path of the user
      image: {
        type: String,
      },
      // User's unique identifier
      id: {
        type: mongoose.Types.ObjectId,
      },
    },

    // Array of user IDs who liked the post
    likes: {
      type: [String],
    },

    // Array of comments associated with the post
    comments: [
      {
        // User who commented, referencing the "users" collection
        commentedBy: {
          type: mongoose.Types.ObjectId,
          ref: "users",
        },
        // Content of the comment
        text: {
          type: String,
          required: true,
        },
        // Timestamp for when the comment was made
        commentedAt: {
          type: Date,
          default: new Date(),
          required: true,
        },
        // Array of user IDs who liked the comment
        like: {
          type: [String],
        },
      },
    ],
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create and export the Post model
const Post = mongoose.model("Post", PostSchema);
export default Post;
// Import the mongoose library for database operations
import mongoose from "mongoose";

// Define the schema for the Message model
const messageSchema = new mongoose.Schema(
  {
    // The user who sent the message, referencing the "users" collection
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    // The content of the message, trimmed to remove unnecessary whitespace
    content: { type: String, trim: true },

    // The chat the message belongs to, referencing the "Chat" collection
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // Array of user IDs who have read the message, referencing the "users" collection
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create the Message model based on the schema
const Message = mongoose.model("Message", messageSchema);

// Export the model for use in other parts of the application
export default Message;
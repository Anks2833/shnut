// Import the mongoose library for database operations
import mongoose from "mongoose";

// Define the schema for the Chat model
const chatSchema = new mongoose.Schema(
  {
    // Name of the chat; trimmed to remove unnecessary whitespace
    chatName: { type: String, trim: true },

    // Flag to indicate if the chat is a group chat; defaults to `false`
    isGroupChat: { type: Boolean, default: false },

    // Array of user IDs participating in the chat, referencing the "users" collection
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],

    // Latest message in the chat, referencing the "Message" collection
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    // Admin of the group chat, referencing the "users" collection
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create the Chat model based on the schema
const Chat = mongoose.model("Chat", chatSchema);

// Export the model for use in other parts of the application
export default Chat;
// Importing required modules and functions
import express from "express";
import auth from "../../middleware/auth.js"; // Middleware to protect routes
import accessChat from "../../Controllers/chat/accessChat.js"; // Controller for accessing a chat
import fetchChats from "../../Controllers/chat/fetchChat.js"; // Controller for fetching chats

// Initialize the router
const router = express.Router();

// Define route for accessing a chat (POST request)
router.route("/").post(accessChat); // Access chat by posting necessary details

// Define route for fetching chats (GET request), protected by auth middleware
router.route("/").get(auth, fetchChats); // Fetch all chats, requires authentication

// Export the router for use in the main application
export default router;
// Importing required modules and functions
import express from "express";
import auth from "../../middleware/auth.js"; // Middleware to protect routes
import allMessage from "../../Controllers/chat/allMessage.js"; // Controller to get all messages in a chat
import sendMessage from "../../Controllers/chat/sendMessage.js"; // Controller to send a new message

// Initialize the router
const router = express.Router();

// Define route for getting all messages in a specific chat (GET request)
router.route("/:chatId").get(auth, allMessage); // Fetch all messages from the chat identified by chatId

// Define route for sending a new message (POST request)
router.route("/").post(auth, sendMessage); // Send a message, requires authentication

// Export the router for use in the main application
export default router;
// Importing required modules and functions
import express from "express";
import auth from "../../middleware/auth.js"; // Authentication middleware
import { createPost } from "../../Controllers/Posts/Posts.js"; // Controller to create a new post
import list from "../../Controllers/Posts/listNewsFeed.js"; // Controller to list posts on the news feed
import postById from "../../Controllers/Posts/postById.js"; // Controller to fetch post by ID
import userById from "../../Controllers/users/userById.js"; // Controller to fetch user by ID
import { likePost, unlike } from "../../Controllers/Posts/likePost.js"; // Controllers for liking and unliking posts
import commentPost from "../../Controllers/Posts/commentPost.js"; // Controller to comment on a post
import list1 from "../../Controllers/users/listUser.js"; // Controller to list users
import uncomment from "../../Controllers/Posts/uncomment.js"; // Controller to remove a comment
import remove from "../../Controllers/Posts/remove.js"; // Controller to remove a post

// Initialize the router
const router = express.Router();

// Routes
// Route to create a post (requires authentication)
router.route("/:userId").post(auth, createPost);

// Route to list all posts in the feed (by user ID)
router.route("/feed/:userId").get(list);

// Route to list users (by user ID)
router.route("/feeduser/:userId").get(list1);

// Routes for liking and unliking posts
router.route("/like").put(auth, likePost);
router.route("/unlike").put(auth, unlike);

// Routes for commenting and uncommenting posts
router.route("/comment").put(auth, commentPost);
router.route("/uncomment").put(auth, uncomment);

// Route to delete a post (by post ID)
router.route("/:postId").delete(remove);

// Route parameter middleware
router.param("userId", userById); // Middleware to fetch user by user ID
router.param("postId", postById); // Middleware to fetch post by post ID

// Export the router for use in the main application
export default router;
// Importing required modules and functions
import express from "express";
import RegisterControllers from "../../Controllers/auth/RegisterControllers.js"; // Controller for user registration
import LoginControllers from "../../Controllers/auth/LoginControllar.js"; // Controller for user login
import addFollower from "../../Controllers/users/addFollower.js"; // Controller to add a follower
import addFollowing from "../../Controllers/users/addFollowing.js"; // Controller to add a following
import auth from "../../middleware/auth.js"; // Authentication middleware
import findpeaple from "../../Controllers/users/findpeople.js"; // Controller to find people by user ID
import userById from "../../Controllers/users/userById.js"; // Controller to fetch user by user ID
import read from "../../Controllers/users/read.js"; // Controller to read user details
import update from "../../Controllers/users/updateUser.js"; // Controller to update user details
import check from "../../Controllers/auth/check.js"; // Controller to check for user existence
import removeFollower from "../../Controllers/users/removeFollowers.js"; // Controller to remove a follower
import removeFollowing from "../../Controllers/users/removeFollowing.js"; // Controller to remove a following
import allUsers from "../../Controllers/users/allusers.js"; // Controller to get all users

// Initialize the router
const router = express.Router();

// Routes
// Register route
router.post("/register", RegisterControllers);

// Login route
router.post("/login", LoginControllers);

// Follow route: Adds a follower and a following
router.put("/follow", addFollower, addFollowing);

// Unfollow route: Removes a follower and a following
router.put("/unfollow", removeFollower, removeFollowing);

// Find people by user ID (requires authentication)
router.get("/findpeople/:userId", auth, findpeaple);

// Read user details by user ID
router.get("/:userId", read);

// Update user details (requires check and user ID)
router.put("/update/:userId", check, update);

// Get all users (requires authentication)
router.get("/", auth, allUsers);

// Route parameter middleware
router.param("userId", userById); // Middleware to fetch user by user ID

// Export the router for use in the main application
export default router;
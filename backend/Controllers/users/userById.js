import User from "../../Schema/User.js";

// Middleware to retrieve user by ID and populate following and followers information
const userById = async (req, res, next, id) => {
  try {
    // Fetch user by ID, populating the 'following' and 'followers' fields
    const user = await User.findById(id)
      .populate('following', '_id name image')  // Populate the 'following' field
      .populate('followers', '_id name image') // Populate the 'followers' field
      .exec();

    // If user is not found, return a 400 error with a relevant message
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Assign the retrieved user to the 'profile' property in the request object
    req.profile = user;

    // Call the next middleware in the chain
    next();
  } catch (err) {
    // Catch any error during the process and return a 400 error
    return res.status(400).json({
      error: "Could not retrieve user", // Provide a more descriptive error message
    });
  }
};

export default userById; // Export the function using ESM syntax
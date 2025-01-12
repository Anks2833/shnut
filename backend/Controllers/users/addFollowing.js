import User from '../../Schema/User.js';

// @route POST api/users/following
// @desc Add a following to a user
// @access Private
const addFollowing = async (req, res, next) => {
  const { userId, followId } = req.body;

  if (!userId || !followId) {
    return res.status(400).json({ error: "User ID and Follow ID are required" });
  }

  try {
    // Find the user and update their following list
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { following: followId } },
      { new: true } // Ensure the updated user is returned
    ).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Proceed to next middleware
    next();
    
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Return a general error message
    return res.status(400).json({ error: "Failed to add following" });
  }
};

export default addFollowing;
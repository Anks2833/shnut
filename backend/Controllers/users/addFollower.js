import User from '../../Schema/User.js';

// @route POST api/users/follow
// @desc Add a follower to a user
// @access Private
const addFollower = async (req, res, next) => {
  const { followId, userId } = req.body;

  if (!followId || !userId) {
    return res.status(400).json({ error: "Follow ID and User ID are required" });
  }

  try {
    // Find the user to follow and update their followers list
    const user = await User.findByIdAndUpdate(
      followId,
      { $push: { followers: userId } },
      { new: true } // Ensure that the updated user is returned
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the updated user data
    res.status(200).json(user);
    
    // Move to the next middleware (if applicable)
    next();

  } catch (err) {
    console.error(err); // Log the error for debugging

    // Return a general error message
    return res.status(400).json({ error: "Failed to add follower" });
  }
};

export default addFollower;
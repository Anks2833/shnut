import User from '../../Schema/User.js';

const removeFollowing = async (req, res) => {
  try {
    // Remove unfollowId from the following array of userId
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId, 
      { $pull: { following: req.body.unfollowId } },
      { new: true }
    ).exec();

    // Respond with the updated user data after removing the following
    res.json(updatedUser);
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(400).json({
      error: 'Error removing following. Please try again later.',
    });
  }
};

export default removeFollowing;
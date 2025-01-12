import User from '../../Schema/User.js';

const removeFollower = async (req, res) => {
  console.log(req.body); // Log the request body for debugging

  try {
    // Remove follower by pulling userId from the followers array
    const updatedUser = await User.findByIdAndUpdate(
      req.body.unfollowId, 
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec();

    // Respond with the updated user details after removing the follower
    res.json(updatedUser);
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(400).json({
      error: 'Error removing follower. Please try again later.',
    });
  }
};

export default removeFollower;
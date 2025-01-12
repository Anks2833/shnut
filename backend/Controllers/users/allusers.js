import User from '../../Schema/User.js';

// @route GET api/users
// @desc Get all users excluding the current user
// @access Public
const allUsers = async (req, res) => {
  const searchQuery = req.query.search || ''; // Default to empty string if no search keyword

  const keyword = searchQuery
    ? {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users); // Send users in JSON format
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export default allUsers;
import User from '../../Schema/User.js';

const findPeople = async (req, res) => {
  const following = req.profile.following; // Get the list of users the current user is following
  console.log(following); // Debugging the list of following users
  following.push(req.profile._id); // Add current user's ID to the list to exclude them from results

  try {
    const users = await User.find({ _id: { $nin: following } }) // Find users who are not in the following list
      .select('name'); // Only select the 'name' field

    res.json(users); // Send the list of users as the response
  } catch (error) {
    console.error(error); // Log any error
    res.status(400).json({
      error: 'Error fetching users. Please try again later.',
    });
  }
};

export default findPeople;
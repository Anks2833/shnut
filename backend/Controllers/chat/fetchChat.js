import User from "../../Schema/User.js";
import Chat from "../../Schema/Chat.js";

// @route GET api/chats
// @desc Fetch all chats for a specific user
// @access Private
const fetchChats = async (req, res) => {
  try {
    // Find chats for the user
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password") // Exclude password from users
      .populate("groupAdmin", "-password") // Exclude password from group admin
      .populate("latestMessage") // Populate latest message data
      .sort({ updatedAt: -1 }); // Sort by updatedAt in descending order

    // Populate the sender details in the latest message
    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email",
    });

    return res.status(200).json(populatedChats); // Send the populated chats with a 200 status code
  } catch (error) {
    console.error(error); // Log any errors that occur
    return res.status(400).json({ message: error.message }); // Return error message with status 400
  }
};

export default fetchChats; // ESM export
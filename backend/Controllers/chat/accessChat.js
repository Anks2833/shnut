import User from '../../Schema/User.js';
import Chat from '../../Schema/Chat.js';

// @route POST api/chat/accessChat
// @desc Access or create a chat between two users
// @access Private
const accessChat = async (req, res) => {
  try {
    const { userId } = req.body; // Destructure userId from request body

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400); // Return 400 if userId is missing
    }

    // Check if a chat already exists between the two users
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.body.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password") // Exclude password field from populated users
      .populate("latestMessage"); // Populate latest message

    // Populate sender data for the latest message
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email", // Select only name and email of sender
    });

    // If a chat exists, return it
    if (isChat.length > 0) {
      return res.json(isChat[0]);
    } else {
      // If no chat exists, create a new one
      const chatData = {
        chatName: "sender", // Default chat name
        isGroupChat: false, // Not a group chat
        users: [req.body.id, userId], // Add both users to the chat
      };

      // Create the chat
      const createdChat = await Chat.create(chatData);

      // Retrieve the full chat with populated user data
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users", 
        "-password"
      );
      
      return res.status(200).json(fullChat); // Return the created chat
    }
  } catch (error) {
    console.error(error); // Log any errors
    return res.status(400).json({ message: error.message }); // Return error message with status 400
  }
};

export default accessChat; // Use export default for ESM compatibility
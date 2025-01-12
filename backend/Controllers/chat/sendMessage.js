import Message from "../../Schema/Message.js";
import Chat from "../../Schema/Chat.js";
import User from "../../Schema/User.js";

// @route POST api/messages
// @desc Send a message in a chat
// @access Private
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  // Validate required fields
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ message: "Content and ChatId are required" }); // Return a proper error message
  }

  // Create new message object
  const newMessage = {
    sender: req.body.id,
    content,
    chat: chatId,
  };

  try {
    // Create a new message
    let message = await Message.create(newMessage);

    // Populate message sender and chat details
    message = await message.populate("sender", "name image");
    message = await message.populate("chat");

    // Populate chat users and select necessary fields
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    });

    // Update the latest message in the associated chat
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    // Return the newly created and populated message as the response
    return res.status(200).json(message);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).json({ message: error.message }); // Return the error message with status 400
  }
};

export default sendMessage; // ESM export
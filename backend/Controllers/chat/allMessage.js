import Message from "../../Schema/Message.js";
// import Chat from "../../Schema/Chat";
// import User from "../../Schema/User";

// @route GET api/messages/:chatId
// @desc Get all messages for a specific chat
// @access Private
const allMessage = async (req, res) => {
  try {
    const { chatId } = req.params; // Extract chatId from params

    // Fetch messages for the specific chat and populate sender details and chat information
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name image email") // Populate sender's name, image, and email
      .populate("chat"); // Populate chat data

    return res.status(200).json(messages); // Return the messages with status 200
  } catch (error) {
    console.error(error); // Log any errors that occur
    return res.status(400).json({ message: error.message }); // Return error message with status 400
  }
};

export default allMessage; // Use export default for ESM compatibility
import Post from '../../Schema/Post.js';

// @route POST api/posts/like
// @desc Like a post
// @access Private
const likePost = async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: "Missing required fields: postId or userId" });
  }

  try {
    // Add userId to the likes array of the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );

    // Return the updated post with the new like added
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Something went wrong", error: error.message }); // Return error message
  }
};

// @route POST api/posts/unlike
// @desc Unlike a post
// @access Private
const unlike = async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: "Missing required fields: postId or userId" });
  }

  try {
    // Remove userId from the likes array of the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    // Return the updated post with the like removed
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Something went wrong", error: error.message }); // Return error message
  }
};

export { likePost, unlike }; // ESM export
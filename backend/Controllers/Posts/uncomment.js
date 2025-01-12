import Post from "../../Schema/Post.js";

// @route DELETE api/posts/:postId/comment/:commentId
// @desc Remove a comment from a post
// @access Private
const uncomment = async (req, res) => {
  const { commentId, postId } = req.body.comment;

  if (!commentId || !postId) {
    return res.status(400).json({ error: "Comment ID and Post ID are required" });
  }

  try {
    // Pull the comment with the given ID from the post
    const result = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    )
      .populate('comments.commentedBy', '_id name image')
      .populate('author', '_id name')
      .exec();

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return the updated post with comments
    res.status(200).json(result);

  } catch (err) {
    console.error(err); // Log the error for debugging

    // Return a general error message
    return res.status(400).json({ error: "Failed to remove comment" });
  }
};

export default uncomment;
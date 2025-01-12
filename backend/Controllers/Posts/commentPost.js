import Post from "../../Schema/Post.js";

// @route POST api/posts/comment
// @desc Comment on a post
// @access Private
const commentPost = async (req, res) => {
  const { comment, userId, postId } = req.body;

  if (!comment || !userId || !postId) {
    return res.status(400).json({ message: "Missing required fields: comment, userId, or postId" });
  }

  // Add the userId to the comment object
  comment.commentedBy = userId;

  console.log(comment);

  try {
    // Update the post with the new comment
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.commentedBy", "_id name image")
      .populate("author", "_id name")
      .exec();

    // Return the updated post with populated comment data
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Something went wrong", error: error.message }); // Return error message
  }
};

export default commentPost; // ESM export
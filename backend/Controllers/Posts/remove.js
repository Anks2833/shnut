// import Post from "../../Schema/Post";

// @route DELETE api/posts/:postId
// @desc Delete a post
// @access Private
const remove = async (req, res) => {
  const post = req.post; // Access the post from the request

  try {
    // Remove the post from the database
    const deletedPost = await post.remove();
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Respond with the deleted post details
    res.status(200).json({ message: "Post deleted successfully", deletedPost });

  } catch (err) {
    console.error(err); // Log the error for debugging

    // Return a more specific error message
    return res.status(400).json({ error: "Failed to delete post" });
  }
};

export default remove;
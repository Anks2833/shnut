import Post from "../../Schema/Post.js";

// @route GET api/posts/:postId
// @desc Fetch a single post by its ID
// @access Public
const postByID = async (req, res, next, id) => {
  try {
    // Find post by ID and populate the author field with _id and name
    const post = await Post.findById(id)
      .populate('author', '_id name')
      .exec();

    // If the post is not found, send an error message
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    // Attach the post to the request object for subsequent middleware
    req.post = post;
    next();
  } catch (err) {
    console.error(err);  // Log the error for debugging
    return res.status(400).json({
      error: "Could not retrieve the post"
    });
  }
};

export default postByID;  // ESM export
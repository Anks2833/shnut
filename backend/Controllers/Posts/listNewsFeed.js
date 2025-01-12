import Post from '../../Schema/Post.js';

// @route GET api/posts/list
// @desc Get all posts for users that the current user is following
// @access Private
const list = async (req, res) => {
  const { following, _id } = req.profile;  // Destructure from profile object
  following.push(_id);  // Add the current user to the following array

  try {
    // Retrieve posts of users that the current user is following
    const posts = await Post.find({ author: { $in: following } })
      .populate('author', '_id name image')
      .populate('comments.commentedBy', '_id name image')
      .sort('-createdAt')  // Changed '-created' to '-createdAt' assuming that the field name is 'createdAt'
      .exec();

    // Return the posts
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(400).json({ message: "Something went wrong", error: error.message });
  }
};

export default list;  // ESM export
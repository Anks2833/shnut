import Post from '../../Schema/Post.js';

const listPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', '_id name image') // Populate the 'author' field with the user's details
      .populate('comments.commentedBy', '_id name image') // Populate the commenter details for each comment
      .sort('-created') // Sort the posts by creation date in descending order
      .exec();

    res.json(posts); // Send the list of posts as the response
  } catch (error) {
    console.error(error); // Log any error
    return res.status(400).json({
      error: 'Error fetching posts. Please try again later.',
    });
  }
};

export default listPostsByUser;
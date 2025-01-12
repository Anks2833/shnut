import Post from "../../Schema/Post.js";
// import User from "../../Schema/User";
// import formidable from 'formidable';

// @route POST api/posts/create
// @desc Create a new post
// @access Private
const createPost = async (req, res) => {
  try {
    console.log(req.body);  // Log the incoming request body for debugging

    const { Text, pic, user } = req.body;

    // Validate required fields
    if (!Text || !pic || !user || !user.id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new post object
    const newPost = new Post({
      caption: Text,
      photo: pic,
      author: user.id,
      userDetails: {
        name: user.name,
        id: user.id,
      },
    });

    // Save the post to the database
    const result = await newPost.save();
    res.status(201).json(result); // Return the newly created post

  } catch (err) {
    console.error(err);  // Log the error for debugging
    return res.status(400).json({ error: "Failed to create post" });
  }
};

// @route GET api/posts/
// @desc Fetch all posts
// @access Public (or Private if needed)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name image'); // Example population
    res.status(200).json(posts); // Return the fetched posts

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to fetch posts" });
  }
};

// @route POST api/posts/like
// @desc Like a post
// @access Private
const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ error: "Post ID and User ID are required" });
    }

    // Find the post and add the user to the likes array
    const post = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post); // Return the updated post

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to like post" });
  }
};

// @route DELETE api/posts/:postId
// @desc Delete a post
// @access Private
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to delete post" });
  }
};

// @route PUT api/posts/:postId
// @desc Update a post
// @access Private
const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { Text, pic } = req.body;

    if (!Text && !pic) {
      return res.status(400).json({ error: "At least one field is required for update" });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, { caption: Text, photo: pic }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost); // Return the updated post

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update post" });
  }
};

export {
  createPost,
  getPosts,
  likePost,
  deletePost,
  updatePost,
};
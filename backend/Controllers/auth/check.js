// Importing the User model for database operations
import User from '../../Schema/User.js';

/**
 * Middleware function to check if the email is already registered.
 * If a user tries to update their email, this function ensures the new email is not already in use.
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object used to send the result.
 * @param {Function} next - The next middleware function to continue processing.
 * @returns {void}
 */
const check = async (req, res, next) => {
  const user = req.profile; // Access the profile of the logged-in user

  // Check if the email is being updated and it's different from the current user's email
  if (req.body.email && req.body.email !== user.email) {
    try {
      // Check if the new email is already registered
      const existingUser = await User.findOne({ email: req.body.email });

      // If the email is already in use, send an error response
      if (existingUser) {
        return res.json({ error: 'Email already exists' });
      } else {
        // If email is not in use, continue to the next middleware
        return next();
      }
    } catch (err) {
      // Handle any database errors
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // If no email change or email is the same, continue to the next middleware
  next();
};

export default check;
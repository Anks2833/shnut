import User from '../../Schema/User.js';
import validateLoginInput from '../../validation/login.js';
// import keys from '../../config/key';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Login Controller for authenticating the user.
 * This function validates login inputs, checks user credentials, and generates a JWT token upon successful login.
 * @param {Object} req - The request object containing the login credentials (email and password).
 * @param {Object} res - The response object to send back the result (JWT token or error).
 * @returns {void}
 */
const LoginControllers = async (req, res) => {
  // Validate form inputs
  const { errors, isValid } = validateLoginInput(req.body);

  // If validation fails, return error response
  if (!isValid) {
    return res.status(400).json({ errors: "Invalid email or password" });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return error response
    if (!user) {
      return res.status(404).json({ errors: "Email not found" });
    }

    // Compare the provided password with the stored hash using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords match, create and send JWT token
    if (isMatch) {
      const payload = { id: user.id, name: user.name };

      // Sign the JWT token with a one-year expiration
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: "Token signing failed" });
        }

        // Return success response with the token
        return res.json({
          success: true,
          token: `Bearer ${token}`,
          name: user.name,
        });
      });
    } else {
      return res.status(400).json({ errors: "Password incorrect" });
    }
  } catch (err) {
    // Handle any errors during the process
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export default LoginControllers;
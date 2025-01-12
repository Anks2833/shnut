import User from "../../Schema/User.js";
import bcrypt from "bcrypt"; // Updated to bcrypt

// Update user profile
const update = async (req, res) => {
  const user = req.profile; // Get user from profile middleware

  // Log the incoming request body for debugging
  console.log(req.body);

  // Set the updated timestamp
  req.body.updated = Date.now();

  // If password is provided, validate and hash it
  if (req.body.password) {
    // Ensure password length is at least 6 characters
    if (req.body.password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    try {
      // Hash the password with a salt of 10 rounds
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      // Update the user password
      user.password = hashedPassword;
      await user.save(); // Save the updated user data

      return res.json(user); // Respond with the updated user
    } catch (err) {
      return res.status(500).json({
        error: "Error hashing password, please try again later.",
      });
    }
  } else {
    // If no password is provided, update the rest of the user data
    try {
      const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
        useFindAndModify: false,
      });

      return res.json(updatedUser); // Respond with the updated user data
    } catch (err) {
      return res.status(500).json({
        error: "Error updating user profile, please try again later.",
      });
    }
  }
};

export default update;
import bcrypt from 'bcrypt'; // Import bcrypt
import jwt from 'jsonwebtoken';
// import keys from '../../config/key'; 
import validateRegisterInput from '../../validation/registeration.js';
import User from '../../Schema/User.js';

// @route POST api/users/register
// @desc Register user
// @access Public
const RegisterControllers = async (req, res) => {
  try {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors); // Return validation errors
    }

    // Check if the email already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      // Create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      
      // Set the hashed password and save the user to the database
      newUser.password = hashedPassword;
      await newUser.save();

      // Return the created user
      res.json(newUser);
    }
  } catch (err) {
    // Handle errors
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export default RegisterControllers;
// import User from "../../Schema/User";

const getUserProfile = (req, res) => {
  try {
    // Respond with the user's profile details from the request object
    res.json(req.profile);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).json({
      error: 'Error fetching user profile. Please try again later.',
    });
  }
};

export default getUserProfile;
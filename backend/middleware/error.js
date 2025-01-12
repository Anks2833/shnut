// Import the custom error response utility
import ErrorResponse from "../utils/errorResponse.js";

/**
 * Middleware to handle errors in the application
 * @param {Object} err - The error object containing details of the error
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @param {Function} next - The next middleware function in the request-response cycle
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // Copy the original error object to avoid direct mutations
  error.message = err.message; // Assign the error message to the copied object

  // Handle duplicate key errors (MongoDB error with code 11000)
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400); // Create a custom error response
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message); // Extract all validation error messages
    error = new ErrorResponse(message, 400); // Create a custom error response
  }

  // Log the error message for debugging purposes
  console.error(`Error: ${error.message}`);

  // Respond to the client with the error details
  res.status(error.statusCode || 500).json({
    success: false, // Indicates the request was not successful
    error: error.message || "Server Error", // Provide a descriptive error message or default to "Server Error"
  });
};

// Export the error handler as a named export for better modularity
export { errorHandler };
// ErrorResponse class to handle custom error responses
class ErrorResponse extends Error {
  /**
   * Constructor for the ErrorResponse class.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code for the error.
   */
  constructor(message, statusCode) {
    // Call the parent Error class constructor to set the message
    super(message);

    // Set the custom statusCode for the error
    this.statusCode = statusCode;

    // Capturing the stack trace for debugging purposes
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Exporting the ErrorResponse class for use in other modules
export default ErrorResponse;
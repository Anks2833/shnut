// Importing necessary libraries for validation and checking empty fields
import Validator from 'validator';
import isEmpty from 'is-empty';

/**
 * Function to validate login input data (email and password).
 * @param {Object} data - The login input data containing email and password.
 * @returns {Object} - Returns an object containing any validation errors and the validation status.
 */
export default function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Returning validation errors and the validation status (true if no errors)
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
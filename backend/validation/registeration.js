// Importing necessary libraries for validation and checking empty fields
import validator from 'validator';
import isEmpty from 'is-empty';

/**
 * Function to validate registration input data (name, email, password, and confirm password).
 * @param {Object} data - The registration input data containing name, email, password, and password confirmation.
 * @returns {Object} - Returns an object containing any validation errors and the validation status.
 */
export default function validateRegisterInput(data) {
  let errors = {};

  // Ensure fields are not empty before validation
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name validation
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email validation
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Confirm password validation
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  // Password length validation
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // Password match validation
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Return validation errors and the validity status
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
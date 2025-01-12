// Import necessary modules
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
// import keys from "./key.js";

// Load User model
const User = mongoose.model("users");

// JWT options configuration
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from the Authorization header (Bearer Token)
    secretOrKey: process.env.JWT_SECRET, // Secret key for verifying the token's signature
};

/**
 * Configures Passport to use the JWT strategy for authentication.
 * 
 * @param {object} passport - The Passport instance.
 */
const configurePassport = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // Find the user based on the ID encoded in the JWT payload
                const user = await User.findById(jwt_payload.id);
                
                if (user) {
                    // If user exists, pass the user object to Passport
                    return done(null, user);
                } else {
                    // If user is not found, pass `false` to indicate authentication failure
                    return done(null, false);
                }
            } catch (err) {
                // Log any errors that occur during database operations
                console.error("Error in JWT strategy:", err);
                return done(err, false);
            }
        })
    );
};

// Export the configuration function as a module
export default configurePassport;
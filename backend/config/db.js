import mongoose from "mongoose"; // Importing the Mongoose library for MongoDB interactions.
import { DB_NAME } from "../constants.js"; // Importing the database name constant from a separate file.

/**
 * Establishes a connection to the MongoDB database.
 * The function ensures that the database URI is defined and then attempts to connect to it.
 */
const connectDB = async () => {
    // Check if the environment variable for MongoDB URI is defined.
    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable"); 
        // Throws an error if the MongoDB URI is missing.
    }

    try {
        // Attempt to connect to MongoDB using the URI and database name.
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        // Log a success message, including the host of the connected instance.
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        // Log the connection error message for debugging purposes.
        console.error(`Mongoose Connection Error: ${error.message}`);
        
        // Exit the process with a non-zero status to indicate a failure.
        // Alternatively, you could implement a retry mechanism for better resilience.
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other parts of the application.
export { connectDB };
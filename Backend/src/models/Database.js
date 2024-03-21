// Importing required modules
const mongoose = require('mongoose')
require('dotenv').config() // Loading environment variables from .env file

// Function to start the database connection
const connectToDatabase = async () => {
    try {
        // Connecting to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        // Handling connection error
        console.error('Error connecting to MongoDB:', error.message)
    }
}

// Function to check if the database is connected
const isConnected = () => {
    // Checking if the connection state is equal to 1 (connected)
    return mongoose.connection.readyState === 1
}

// Exporting functions and router for use in other modules
module.exports = {
    connectToDatabase,
    isConnected,
}

const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // Do not exit the process here so the server can start for local development and debugging.
        // Caller can decide how to handle the failure. Return the error so the caller may act on it.
        return error;
    }
};
module.exports = connectDB;
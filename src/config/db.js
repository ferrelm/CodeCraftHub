const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        const safeUri = uri && uri.replace(/:\/\/[\w%+\-.]+:([^@]+)@/, '://<redacted>@');
        console.log('Attempting MongoDB connection with URI:', safeUri || '<undefined>');
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // process.exit(1);
        // Do not exit the process here so the server can start for local development and debugging.
        // Caller can decide how to handle the failure. Return the error so the caller may act on it.
        return error;
    }
};
module.exports = connectDB;
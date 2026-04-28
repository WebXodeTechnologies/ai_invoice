const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // .trim() is essential to prevent invisible character errors from .env files
    const uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";

    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(uri, {
      // These options ensure the driver doesn't hang indefinitely 
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
    });

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(`Message: ${err.message}`);
    
    // In production, you want the app to crash so your orchestrator (PM2/Docker) can restart it
    process.exit(1);
  }
};

module.exports = connectDB;
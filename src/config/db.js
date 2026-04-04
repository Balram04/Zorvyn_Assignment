const mongoose = require('mongoose');
dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

module.exports = connectDB;
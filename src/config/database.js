const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.DB_CONNECTION_STRING)
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION_STRING,
     
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectDB };

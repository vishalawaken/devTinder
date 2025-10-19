const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tsinghvishall_db_user:F8DL8Sbxz1mryR2x@namastenode.7ayuofd.mongodb.net/devTinder?retryWrites=true&w=majority",
     
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = { connectDB };

const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(cookieParser());

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter=require('./routes/user');
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);








connectDB()
  .then(() => {
    console.log("✅ Database Connection Established Successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

app.listen(3001, () => {
  console.log("🚀 Server started on port 3001");
});

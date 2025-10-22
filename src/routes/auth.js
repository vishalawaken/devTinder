const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // Validating the data before saving to database
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new Instance of the User
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log("👤 User object created:", user);

    console.log("⏳ Saving user to DB...");
    await user.save();
    console.log("✅ User saved successfully");

    res.send("User created successfully");
  } catch (error) {
    console.error("❌ Error while creating user:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email id is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder@123");
      console.log(token);

      // Add the Token to the cookie and send the response back to the user

      res.cookie("token", token);
      res.send("User Login Succesfull!!!");
    } else {
      throw new Error("Password is not Correct");
    }
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("User Logged Out Successfully");
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
});

module.exports = authRouter;

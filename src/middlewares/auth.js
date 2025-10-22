const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is Not Valid");
    }
    const decodedObj = await jwt.verify(token, "Dev@Tinder@123");
    // Validate the token
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
};

module.exports = {
  userAuth,
};

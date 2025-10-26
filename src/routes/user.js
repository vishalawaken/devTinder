const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

const User = require("../models/user");

// Get all the PeNdning connection request for the logged in User]
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "skills",
    ]);
    res.json({
      message:
        "All the Data Related to Requests sent to User is Sent Succesfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Something went Wrong: " + err.message);
  }
});

// Get all the connections of the logged in user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "skills",
      ]);

    const data = connectionRequests.map((row) => {
      // If logged-in user is the receiver, return the sender (fromUserId)
      if (row.toUserId._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      // If logged-in user is the sender, return the receiver (toUserId)
      else {
        return row.toUserId;
      }
    });

    res.json({
      message: "All the Connections of the User is Sent Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
});

// Get the feed of the logged in user
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    // User Should see all the userCards
    // user Should not see his Own Card
    // User should not see the already made connections card
    // User should not see the card of the people whom the user ignored
    // User should not see the card of the person whome the user have already sent the request
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const loggedInUser = req.user;
    // Find all the     Connection request that i have either send or received to me
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    const hideUsersFromTheFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromTheFeed.add(req.fromUserId.toString());
      hideUsersFromTheFeed.add(req.toUserId.toString());
    });
    console.log(hideUsersFromTheFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromTheFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName photoUrl about age gender skills")
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
});

module.exports = userRouter;

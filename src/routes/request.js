const { userAuth } = require('../middlewares/auth');


const express=require('express');

const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user=req.user;
    // Sending a Connection request
    console.log("Sending a Connection Request");
try{
    res.send(user.firstName+"has sent a connection request to you");
  } catch (error) {
    res.status(400).send("Something went Wrong: " + error.message);
  }
});

module.exports = requestRouter;

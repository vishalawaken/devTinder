const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require('../models/connectionRequest');


const express=require('express');

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req, res) => {
try {
  const fromUserId=req.user._id;
  const toUserId=req.params.touserId;
  const status=req.params.status;

  const connectionRequest=await ConnectionRequestModel.create({fromUserId,toUserId,status});

  const data = await connectionRequest.save();
  res.json({
    message:"Connection Request Sent SuccesFully",
    data:data,
  })

} catch (error) {
  res.status(400).send("Something went Wrong: " + error.message);
}
});

module.exports = requestRouter;

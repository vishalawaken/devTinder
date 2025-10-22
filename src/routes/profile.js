const { userAuth } = require('../middlewares/auth');


const express=require('express')

const profileRouter=express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    res.send(req.user);
  });

  module.exports=profileRouter;
  
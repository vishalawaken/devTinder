const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

const express=require('express')

const profileRouter=express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    res.send(req.user);
  });

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        };

        const loggedInUser=req.user;

        loggedInUser.firstName=req.body.firstName;
        loggedInUser.lastName=req.body.lastName;
        loggedInUser.emailId=req.body.emailId;
        loggedInUser.age=req.body.age;
        loggedInUser.gender=req.body.gender;
        loggedInUser.photoUrl=req.body.photoUrl;
        loggedInUser.about=req.body.about;
        loggedInUser.skills=req.body.skills;

        await loggedInUser.save();
        res.json({
            message:`${loggedInUser.firstName}'s profile updated successfully`,
            data:loggedInUser,
        })
    }
    catch(err){
        res.status(500).json({
            message:"Something went Wrong",
            error:err.message,
        })
    }
})

  module.exports=profileRouter;
  
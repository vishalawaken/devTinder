const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
const{validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");


app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId; // Use query parameter instead of body
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found"); // Add return statement
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});

// Simple test route
app.get("/test", (req, res) => {
  res.send("Server is working perfectly!");
});

app.post("/signup", async (req, res) => {
    // Validating the data before saving to database
    try {
    validateSignUpData(req);
    const {firstName,lastName,emailId,password}=req.body;

    // Encrypt the password
    const passwordHash=await bcrypt.hash(password,10);   
    console.log(passwordHash);     

 
    // Creating a new Instance of the User 
    const user = new User({
        firstName,lastName,emailId,password:passwordHash
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

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Succesfully");
  } catch (error) {
    res.status(400).send(`Something went Wrong `);
  }
});

app.patch("/user:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

 
    try{
        const ALLOWED_UPDATES=[
            "photoUrl","about","gender","age","skills","userId"
        ]
    
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"},{runValidators:true})
        res.send("User Updated Successfully");
    }
    catch(err){
        res.status(400).send(`Something went Wrong `);
    }
})

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

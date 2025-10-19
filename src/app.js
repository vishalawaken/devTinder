const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());

// app.post("/signup", async (req, res) => {
//   const user = new User({
//     firstName: "Virat",
//     lastName: "Kohli",
//     email: "virat@gmail.com",
//     password: "123456",
//     age: 30,
//     gender: "Male",
//   });
//   await user.save();
//   res.send("User created successfully");
// });

app.get("/", (req, res) => {
    console.log("✅ Received GET / request");
    res.send("Server is working fine");
  });

  app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
      const user = new User(req.body);
  
      console.log("⏳ Saving user to DB...");
      await user.save();
      console.log("✅ User saved successfully");
  
      res.send("User created successfully");
    } catch (error) {
      console.error("❌ Error while creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
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

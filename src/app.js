const express=require("express");

const app=express();

// This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send("here is the data of the user")
})

app.post("/user",(req,res)=>{
    console.log("save data to the database")
    res.send("Data succesfully saved")
})


app.use("/test",(req,res)=>
{
    res.send("Hello from the server")
});

app.listen(3000,()=>{
    console.log("succesfully listening on port 3000")
});

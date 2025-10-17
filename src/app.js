const express=require("express");

const app=express();

app.use("/helloo",(req,res)=>
    {
        res.send("Hello betaa")
    })

app.use("/test",(req,res)=>
{
    res.send("Hello from the server")
})

app.listen(3000,()=>{
    console.log("succesfully listening on port 3000")
});

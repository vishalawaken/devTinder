const mongoose=require("mongoose");
const validator=require("validator")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{  
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail){
                throw new Error("Invalid Email Address" +value);
            }
        }
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    photoUrl:{
        type:String,
        default:"https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE",
    },
    about:{
        type:String,
        default:"This is a DEFAULT about section",
    },
    skills:{
        type:[String]
    },
    
},
{
timestamps:true,
}
);


module.exports=mongoose.model("User",userSchema);
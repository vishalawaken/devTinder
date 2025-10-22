const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    emailId:{  
        type:String,
        
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

userSchema.methods.getJWT=async function(){
    const user=this;
   const token = await jwt.sign({_id:user._id},"Dev@Tinder@123");
          return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

module.exports=mongoose.model("User",userSchema);
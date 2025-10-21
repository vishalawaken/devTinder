const validator=require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is Not Valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("EMAIL IS nOTR vALID")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("PASSWORD IS NOT STRONG ENOUGH");
    }
}

module.exports={
    validateSignUpData
}
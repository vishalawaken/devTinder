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

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","age","gender","photoUrl","about","skills"];

    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
    return isEditAllowed;
}

module.exports={
    validateSignUpData,validateEditProfileData
}
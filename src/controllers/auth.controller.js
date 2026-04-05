const userModel = require("../models/user.model");
const jwt=require('jsonwebtoken')
/**
 * - user register controller
 * - POST /api/auth/register
 * - user login controller
 * - POST /api/auth/login
 */

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return res
      .status(422)
      .json({ message: "user already exists", status: "failed" });
  }
  const user=await userModel.create({
    email,password,name
  })
  const token= jwt.sign({userID:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
  res.cookie("jwt_token",token)
  return res.status(201).json({          
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },
    token
  })
}

async function userLoginController(req,res){
   const {email,password}=req.body;
   const user=await userModel.findOne({email}).select("+password")
   if(!user){
    return res.status(401).json({
       message:"Email or password is invalid"
    })
   }
   const isValidPassword=await user.comparePassword(password)
   if(!isValidPassword){
      return res.status(401).json({
       message:"Email or password is invalid"
    })
   }
   const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    return res.status(200).json({          
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },
    token
  })
}

module.exports = {
  userRegisterController, userLoginController
};

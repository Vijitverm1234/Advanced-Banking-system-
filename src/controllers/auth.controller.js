const userModel = require("../models/user.model");
const jwt=require('jsonwebtoken')
/**
 * - user register controller
 * - POST /api/auth/register
 * - user login controller
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

module.exports = {
  userRegisterController,
};

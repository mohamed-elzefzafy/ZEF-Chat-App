const UserModel =  require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { sendOtp, sendInvite } = require("../services/email");
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "./config.env") });
//  /**---------------------------------------
//  * @desc    register user
//  * @route   /api/v1/users/register
//  * @method  POST
//  * @access  public 
//  ----------------------------------------*/

async function login (data ) {
  const otp = Math.floor(100000 + Math.random() * 900000 );
sendOtp(data.email , otp);
let user = await UserModel.findOne({where : {email: data.email}});

if (user) { 
user.otp = otp;
await user.save();
}else {
user = await UserModel.create({email: data.email , otp});
}
 }

async function verifyOtp (data) {
//   const otp = data.otp;
// const email = data.email;
const user = await UserModel.findOne({where : {email : data.email , otp :data.otp }});
if (!user) false;
else {
const token = jwt.sign({userId : user.dataValues?.id}, process.env.JWT_SECRET);
return token;
}

}
 

 function verifytoken (token) {
  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return false;
  }

};


async function inviteUser (data ) {
  sendInvite(data.invitedUser , data.chatId);
};
 module.exports = {
  login , verifyOtp , verifytoken , inviteUser
 }
const { Resend } = require("resend");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "../config.env") });


function sendOtp (email , otp) {
const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Please verify your email',
  html: `<p>please use this OTP : ${otp}</p>`
});
}

function sendInvite (email , chatId) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'chat invitation',
    html: `<p>you have invite to this chat : <a href=${process.env.FRONT_URL}/?chatid=${chatId}>Chat Link</a> </p>`
  });
  }
  
module.exports = {sendOtp , sendInvite};
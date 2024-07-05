const { login, verifyOtp } = require("../controllers/userControler");


const loginSoket = (socket) => async(data) => {
  await login(data)
  
  socket.emit("otpsent");
  }

const verifyOtpSocket = (socket) => async(data) => {
  const result = await verifyOtp(data);
  if (!result) socket.emit("otpfailed");
  else {
    socket.emit("otpsuccess", {token : result});
  }
  }
  module.exports = {loginSoket , verifyOtpSocket};
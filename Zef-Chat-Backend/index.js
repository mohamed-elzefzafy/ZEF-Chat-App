const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const dotenv = require("dotenv");
const path = require("path");
const dbConnect = require('./db');
const UserModel = require('./models/userModel');
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "./config.env") });
const { verifytoken, inviteUser } = require('./controllers/usercontroler');
const ChatModel = require('./models/chatModel');
const { loginSoket, verifyOtpSocket } = require('./sockets/auth');
const { updateChatPrivacy } = require('./sockets/chat');
const MessageModel = require('./models/messageModel');




dbConnect();

const buildPath = path.normalize(path.join(__dirname , "../Zef-Chat-Frontend/dist"));
app.use(express.static(buildPath));

const chats = {};

io.on('connection', (socket) => {
const chatId = socket.request._query.chatId;
const isLoggedIn = socket.request._query.isLoggedIn;

socket.on("login" , loginSoket(socket))

socket.on("otpverify" , verifyOtpSocket(socket));

// if (!isLoggedIn) return;

if (!chats[chatId]) {
  chats[chatId] =[];
}
chats[chatId].push(socket);

socket.on("makePrivate" , updateChatPrivacy)


  socket.on("invitedUsers" , inviteUser)

socket.on("getMessages" , async(data) => {
  const decoded = verifytoken(data.token);
  if (!decoded) {
    return;
  } 

const messages = await MessageModel.findAll({
  where : {chatId: data.chatId}
})

socket.emit("getMessages" , messages);

})


socket.on("getChats" , async(data) => {
  const decoded = verifytoken(data.token);
  if (!decoded) {
    return;
  } 

  const chatss = await ChatModel.findAll({
    where : {ownerId: decoded.userId}
  })
  socket.emit("getChats" , chatss);
});


  socket.on("message" , async(data) => {
    const msg = data.message;
    const token = data.token;
    const decoded = verifytoken(token);

if (!decoded) {
  return;
} 

  const currentChat = msg.chatId;

  await ChatModel.findOrCreate({
    where : {name : currentChat} ,
    defaults : {
      ownerId : decoded.userId
    }
    
  })


await MessageModel.create({
  text : msg.text,
  sender : decoded.userId,
  chatId : currentChat,
})


  if (!chats[currentChat]) return;
    chats[chatId].forEach((s) =>  {
      if (s === socket) return;
      s.emit("message", msg)
    })
  })
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});

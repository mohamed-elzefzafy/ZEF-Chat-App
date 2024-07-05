const { verifytoken } = require("../controllers/userControler");
const ChatModel = require("../models/chatModel");

const updateChatPrivacy =   async(data) => {
  const decodedToken = await verifytoken(data.token);
  if (!decodedToken) {
    return;
  } 
  
   await ChatModel.update( {privacy : 1} ,{
      where : {name : data.chatId , ownerId : decodedToken.userId}
    } )
    }

const inviteUser = async(data) => {
  const decodedToken = await verifytoken(data.token);
if (!decodedToken) {
return;
} 


await inviteUser(data);
}



module.exports = {updateChatPrivacy , inviteUser}
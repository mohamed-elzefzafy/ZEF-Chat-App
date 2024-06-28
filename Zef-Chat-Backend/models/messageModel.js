const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");



const MessageModel = sequelize.define("Message" , {
  text : DataTypes.STRING,
  sender : DataTypes.STRING,
  chatId : DataTypes.STRING,

})


module.exports = MessageModel;




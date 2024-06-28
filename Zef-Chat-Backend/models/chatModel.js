const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");



const ChatModel = sequelize.define("Chat" , {
  name : DataTypes.STRING,
  ownerId : DataTypes.INTEGER,
  privacy : {
    type : DataTypes.TINYINT,
    defaultValue : 0,
  } // 0 => public , 1 => private
})


module.exports = ChatModel;
const sequelize = require("./sequelize");
require("./models/userModel");
require("./models/chatModel");
require("./models/messageModel");

const dbConnect = async() => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("connection established successfully");
  } catch (error) {
    console.log("connection error: " + error);
  }
}

module.exports = dbConnect 



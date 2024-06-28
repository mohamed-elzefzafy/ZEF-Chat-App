const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');



const UserModel = sequelize.define("User", {
  email : DataTypes.STRING,
  otp : DataTypes.STRING,
});


module.exports = UserModel;
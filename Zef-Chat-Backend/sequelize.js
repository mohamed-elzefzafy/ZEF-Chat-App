const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "./config.env") });




const sequelize = new Sequelize(process.env.DB_NAME , process.env.DB_USERNAME , process.env.DB_PASSWORD , {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect:"mysql"
});

module.exports = sequelize;

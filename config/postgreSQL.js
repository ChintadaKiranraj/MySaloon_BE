require('dotenv').config();
const e = require('express');
const { Sequelize } = require('sequelize');
const sequences = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});
sequences.authenticate().then(()=>{
    console.log("Successfully connection database");
}).catch((err)=>{
    console.log("Unable to connect database ?"+err);
});
module.exports = {
    sequences,
}

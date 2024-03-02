const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgreSQL');
const seq = sequelize.sequences;

const Registration = seq.define('registration', {
    email_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  confirm_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_level: {
    type: DataTypes.STRING,
    allowNull: true
  }},{ 
    tableName: 'registration', 
    schema: 'public',
    timestamps: false, 
});

module.exports ={ 
    Registration,
};
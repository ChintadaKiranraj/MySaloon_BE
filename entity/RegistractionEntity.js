const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgreSQL');
const seq = sequelize.sequences;

const Registration = seq.define('registration', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accessLevel: {
    type: DataTypes.INTEGER,
    allowNull: true
  }},{ 
    tableName: 'registration', 
    schema: 'public',
    timestamps: false, 
});

Registration.sync({ alter: true }) // Use alter: true to make only necessary changes to sync the model
    .then(() => {
        console.log('BookingDetailsEntity table synchronized successfully');
    })
    .catch(error => {
        console.error('Error synchronizing Registration table:', error);
    });

module.exports ={ 
    Registration,
};
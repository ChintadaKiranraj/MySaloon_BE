const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgreSQL');
const seq = sequelize.sequences

const Users = seq.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profilePhoto: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registrationDate: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    schema: 'public',
    timestamps: false,
});

Users.sync({ alter: true })
    .then(() => {
        console.log('Users table synchronized successfully');
    })
    .catch((err) => {
        console.error('Error synchronizing Users table:', err);
    });

module.exports = { Users };

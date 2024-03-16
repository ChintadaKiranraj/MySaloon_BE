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
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
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
    registrationDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePhoto: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
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

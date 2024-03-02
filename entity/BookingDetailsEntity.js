const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgreSQL');
const seq = sequelize.sequences;

const BookingDetailsEntity = seq.define('booking_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regEmialId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'booking_details',
    schema: 'public',
    timestamps: false
});

// Synchronize the model with the database to ensure the table exists
BookingDetailsEntity.sync({ alter: true }) // Use alter: true to make only necessary changes to sync the model
    .then(() => {
        console.log('BookingDetailsEntity table synchronized successfully');
    })
    .catch(error => {
        console.error('Error synchronizing BookingDetailsEntity table:', error);
    });

module.exports = {BookingDetailsEntity};

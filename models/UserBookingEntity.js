const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgreSQL');
const { Users } = require('./Users');
const { ShopOwners } = require('./ShopOwnersEntity');
const { BarberApplication } = require('./BarberApplicationsEntity');
const seq = sequelize.sequences;

const BookingDetailsEntity = seq.define('user_booking', {
    bookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shopName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barberId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shopOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_date_time: {
        type: DataTypes.DATE,
        allowNull:false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user_booking',
    schema: 'public',
    timestamps: false
});

BookingDetailsEntity.sync({ alter: true }) 
    .then(() => {
        console.log('UserBookingDetailsEntity table synchronized successfully');
    })
    .catch(error => {
        console.error('Error synchronizing BookingDetailsEntity table:', error);
    });
BookingDetailsEntity.belongsTo(Users, {foreignKey : 'userId'});
BookingDetailsEntity.belongsTo(ShopOwners, {foreignKey : 'shopOwnerId'});
BookingDetailsEntity.belongsTo(BarberApplication, {foreignKey: 'barberId'})

module.exports = {BookingDetailsEntity};

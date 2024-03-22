const { DataTypes } = require('sequelize');
const DB = require('../config/postgreSQL');
const { ShopOwners } = require('./ShopOwnersEntity');
const { Users } = require('./Users');
const sequelize = DB.sequences;

const BarberApplication = sequelize.define('barber_application', {
    barberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    shopOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ShopOwners,
            key: 'shopOwnerId'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'userId'
        }
    },
    shopName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePhoto: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: 'barber_application',
    schema: 'public',
    timestamps: false
});

BarberApplication.sync({ alter: true })
    .then(() => {
        console.log('BarberApplication table synchronized successfully!');
    })
    .catch((error) => {
        console.error('Error synchronizing BarberApplication table:', error);
    });

BarberApplication.belongsTo(ShopOwners, { foreignKey: 'shopOwnerId' });
BarberApplication.belongsTo(Users, { foreignKey: 'userId' });

module.exports = { BarberApplication };

const {DataTypes} =require('sequelize')
const DB = require('../config/postgreSQL')
const {ShopOwners} = require('./ShopOwnersEntity');
const sequelize = DB.sequences;
const BarberApplication = sequelize.define('barber_application',{
    barberId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    shopOwnerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    shopName:{
        type:DataTypes.STRING,
        allowNull:false

    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    experience:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
profilePhoto:{
    type:DataTypes.BLOB,
    allowNull:true
}},{
        tableName:'barber_application',
        schema:'public',
        timestamps:false
});

BarberApplication.sync({alter:true}).then(()=>{
    console.log('successfully!');
}).catch((error)=>{
    console.error('something went to ronge', error);
});

BarberApplication.belongsTo(ShopOwners,{foreignKey:'shopOwnerId'})

module.exports = {BarberApplication}
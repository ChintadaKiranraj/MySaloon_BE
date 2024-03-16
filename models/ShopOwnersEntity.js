const {DataTypes} = require('sequelize');
const sequelize = require('../config/postgreSQL');
const {Users} = require('./Users');
const seq = sequelize.sequences;

const ShopOwners = seq.define('shop_owners',{
    shopOwnerId :{
        type : DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    shopName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    location : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    profile : {
        type : DataTypes.BLOB,
        allowNull: true,

    }},{tableName : 'shop_owners',
    schema : 'public',
    timestamps : false
});
ShopOwners.sync({alter : true}).then(()=>{
    console.log('ShopOwners table synchronized successfully');
}).catch((error)=>{
    console.error('Error synchronizing ShopOwners table: ',error)
});
ShopOwners.belongsTo(Users, { foreignKey: 'userId'});


module.exports = {ShopOwners};